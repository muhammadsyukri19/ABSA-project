import os
import time
import torch
import torch.nn as nn
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification

app = Flask(__name__)
CORS(app)

# Constants
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
MAX_SEQ_LENGTH = 128
NUM_ASPECTS = 9
ASPECT_NAMES = [
    "Performa & Bug", 
    "Pembayaran & Transaksi", 
    "UI/UX", 
    "Layanan Pelanggan", 
    "Fitur Aplikasi",
    "Pengiriman & Logistik",
    "Produk & Penjual",
    "Promosi & Voucher",
    "Lainnya"
]

print(f"Menggunakan device: {DEVICE}")

# ============================================================
# Model ABSA Definition
# ============================================================
class ABSAModel(nn.Module):
    def __init__(self, model_name, num_aspects, dropout=0.3): 
        super().__init__()
        self.encoder = AutoModelForSequenceClassification.from_pretrained(
            model_name, num_labels=2, ignore_mismatched_sizes=True
        )
        hidden_size = self.encoder.config.hidden_size
        self.dropout = nn.Dropout(dropout)
        self.aspek_head = nn.Linear(hidden_size, num_aspects)

    def forward(self, input_ids, attention_mask):
        out = self.encoder.base_model(input_ids=input_ids, attention_mask=attention_mask)
        pooled = self.dropout(out.last_hidden_state[:, 0, :])
        return self.aspek_head(pooled)

# ============================================================
# Preprocessing Helper
# ============================================================
import re
import csv 

def preprocess_text(text):
    text = str(text).lower()
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# ============================================================
# Load InSet Lexicon for Sentiment
# ============================================================
lexicon = {}

def load_lexicon(filepath, default_weight=1):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) >= 2:
                word = row[0].strip().lower()
                try:
                    weight = int(row[1].strip())
                    lexicon[word] = lexicon.get(word, 0) + weight
                except ValueError:
                    lexicon[word] = lexicon.get(word, 0) + default_weight

load_lexicon("positive.tsv", 5)
load_lexicon("negative.tsv", -5)

def get_lexicon_sentiment(text):
    words = text.split()
    score = sum(lexicon.get(w, 0) for w in words)
    
    # Penyesuaian Rule-Base Khusus Domain Review Aplikasi
    for w in words:
        if w in ['lambat', 'error', 'kecewa', 'jelek', 'kurang', 'gagal', 'buruk', 'susah', 'sulit', 'bug', 'lemot']:
            score -= 15
        if w in ['bagus', 'lancar', 'cepat', 'mantap', 'keren', 'mudah', 'puas', 'terbaik', 'ramah', 'membantu']:
            score += 15
            
    if score > 0: return "positif"
    elif score < 0: return "negatif"
    else: return "netral"

# ============================================================
# Load Models
# ============================================================
base_model_path = os.path.join("models", "indobert_base_finetuned")
large_model_path = os.path.join("models", "indobert_large_finetuned")

models = {}

def load_model(name, path, hf_id):
    try:
        print(f"Loading {name} dari {path}...")
        tokenizer = AutoTokenizer.from_pretrained(path) if os.path.exists(os.path.join(path, "tokenizer_config.json")) else AutoTokenizer.from_pretrained(hf_id)
        model = ABSAModel(hf_id, NUM_ASPECTS).to(DEVICE)
        
        weights_path = os.path.join(path, "model_weights.pt")
        if os.path.exists(weights_path):
            model.load_state_dict(torch.load(weights_path, map_location=DEVICE))
        else:
            print(f"WARNING: {weights_path} tidak ditemukan, menggunakan base {hf_id} tanpa bobot finetuned.")
            
        model.eval()
        models[name] = {"model": model, "tokenizer": tokenizer}
        print(f"{name} berhasil dimuat.")
    except Exception as e:
        print(f"Error loading {name}: {e}")

load_model("base", base_model_path, "indobenchmark/indobert-base-p1")
load_model("large", large_model_path, "indobenchmark/indobert-large-p1")


# ============================================================
# Inference Function
# ============================================================
def predict_single_model(text, model_type):
    if model_type not in models:
        return {"error": f"Model {model_type} tidak tersedia"}
        
    m = models[model_type]
    model = m["model"]
    tokenizer = m["tokenizer"]
    
    clean = preprocess_text(text)
    enc = tokenizer(
        clean, max_length=MAX_SEQ_LENGTH,
        padding='max_length', truncation=True, return_tensors='pt'
    )
    
    start_time = time.time()
    with torch.no_grad():
        logits = model(enc['input_ids'].to(DEVICE), enc['attention_mask'].to(DEVICE))
    inference_time = (time.time() - start_time) * 1000 # ms
    
    probs = torch.softmax(logits, dim=1).cpu().numpy()[0]
    best_aspect_idx = int(probs.argmax())
    
    # Sentimen diprediksi menggunakan InSet Lexicon (Rule-Base) seperti usulan tim
    sentimen = get_lexicon_sentiment(clean)
    
    # Kita return sebagai format list of aspect predictions
    return {
        "inference_time_ms": round(inference_time, 2),
        "predictions": [
            {
                "aspect": ASPECT_NAMES[best_aspect_idx],
                "confidence": float(probs[best_aspect_idx]),
                "sentiment": sentimen,
                "processed_text": clean
            }
        ]
    }

# ============================================================
# API Endpoint
# ============================================================
@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({"error": "Teks ulasan tidak boleh kosong"}), 400
        
    result_base = predict_single_model(text, "base")
    result_large = predict_single_model(text, "large")
    
    return jsonify({
        "original_text": text,
        "base_model": result_base,
        "large_model": result_large
    })

if __name__ == '__main__':
    # Menjalankan flask
    app.run(host='0.0.0.0', port=5000, debug=False)

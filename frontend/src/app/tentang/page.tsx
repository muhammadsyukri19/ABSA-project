import SectionHeading from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function TentangPage() {
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading 
          title="Tentang Penelitian" 
          subtitle="Detail teknis dan metodologi di balik proyek Aspect-Based Sentiment Analysis IndoBERT."
        />

        <div className="space-y-12">
          {/* Latar Belakang */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-primary">1. Latar Belakang Proyek</h3>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              <p>
                Proyek ini mengimplementasikan Aspect-Based Sentiment Analysis (ABSA) menggunakan fine-tuning model IndoBERT pada ulasan pengguna aplikasi e-commerce Indonesia. Berbeda dengan analisis sentimen tradisional yang memberikan label polaritas tunggal pada keseluruhan teks, ABSA mampu mengekstrak sentimen yang lebih granular pada aspek-aspek spesifik dari suatu entitas.
              </p>
              <p className="mt-4">
                Hal ini sangat berguna bagi pengembang aplikasi e-commerce untuk mengidentifikasi kekuatan dan kelemahan spesifik layanan mereka berdasarkan masukan pengguna.
              </p>
            </div>
          </section>

          {/* Dataset */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-primary">2. Dataset & Preprocessing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sumber Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Ulasan Google Play Store</li>
                    <li>Aplikasi: Tokopedia, Bukalapak, Blibli</li>
                    <li>Sumber awal: Kaggle</li>
                    <li>Anotasi: LLM-Assisted Annotation</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pipeline Preprocessing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2 text-muted-foreground text-sm">
                    <li><span className="font-semibold text-foreground">Case Folding:</span> Huruf kecil semua</li>
                    <li><span className="font-semibold text-foreground">Cleaning:</span> Hapus non-alfanumerik & URL</li>
                    <li><span className="font-semibold text-foreground">Normalisasi:</span> Kamus slang bahasa Indonesia</li>
                    <li><span className="font-semibold text-foreground">Tokenisasi:</span> IndoBERT Tokenizer</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-xl flex items-center justify-between text-sm font-medium border border-border">
              <span>Data Split:</span>
              <div className="flex gap-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Training: 80%</Badge>
                <Badge variant="outline" className="bg-primary-light/10 text-primary-light border-primary-light/20">Validation: 10%</Badge>
                <Badge variant="outline" className="bg-foreground/5 text-foreground border-border">Testing: 10%</Badge>
              </div>
            </div>
          </section>

          {/* Model Architecture */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-primary">3. Arsitektur Model IndoBERT</h3>
            <p className="text-muted-foreground mb-6">
              Penelitian ini membandingkan dua varian model pre-trained bahasa Indonesia dari Hugging Face: IndoBERT-Base dan IndoBERT-Large, yang kemudian di fine-tuning untuk tugas ABSA.
            </p>
            <div className="overflow-hidden rounded-xl border border-border">
              <Table>
                <TableHeader className="bg-secondary">
                  <TableRow>
                    <TableHead className="w-1/3">Spesifikasi</TableHead>
                    <TableHead>IndoBERT-Base</TableHead>
                    <TableHead>IndoBERT-Large</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Hugging Face ID</TableCell>
                    <TableCell className="font-mono text-xs">indobenchmark/indobert-base-p1</TableCell>
                    <TableCell className="font-mono text-xs">indobenchmark/indobert-large-p1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Transformer Layers</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>24</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hidden Dimensions</TableCell>
                    <TableCell>768</TableCell>
                    <TableCell>1024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Attention Heads</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>16</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jumlah Parameter</TableCell>
                    <TableCell>~110 Juta</TableCell>
                    <TableCell>~340 Juta</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Training Config */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-primary">4. Konfigurasi Fine-Tuning</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Learning Rate", value: "2e-5" },
                { label: "Batch Size", value: "16 / 8" },
                { label: "Epochs", value: "3 - 5" },
                { label: "Optimizer", value: "AdamW" },
                { label: "Max Sequence", value: "128" },
                { label: "Loss Function", value: "Cross Entropy" },
              ].map((param, i) => (
                <div key={i} className="bg-card border border-border p-4 rounded-xl text-center shadow-sm">
                  <div className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">{param.label}</div>
                  <div className="text-lg font-bold text-foreground">{param.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Evaluasi */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-primary">5. Metrik Evaluasi</h3>
            <p className="text-muted-foreground mb-6">
              Mengingat distribusi kelas yang tidak seimbang pada dataset ulasan, <strong>F1-Score (Macro)</strong> dijadikan metrik utama untuk mengevaluasi performa model klasifikasi.
            </p>
            <div className="space-y-4">
              {[
                { name: "Accuracy", desc: "Mengukur proporsi prediksi yang benar secara keseluruhan." },
                { name: "Precision", desc: "Mengukur ketepatan prediksi per aspek dan sentimen (meminimalkan false positive)." },
                { name: "Recall", desc: "Mengukur kemampuan model mendeteksi semua instance per kelas (meminimalkan false negative)." },
                { name: "F1-Score (Macro)", desc: "Rata-rata harmonik Precision dan Recall per kelas. Metrik utama untuk dataset tidak seimbang." },
              ].map((metric, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/80 transition-colors">
                  <div className="w-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{metric.name}</h4>
                    <p className="text-sm text-muted-foreground">{metric.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

import csv
lexicon = {}
with open('positive.tsv', 'r', encoding='utf-8') as f:
    for row in csv.reader(f, delimiter='\t'):
        if len(row) >= 2: lexicon[row[0].strip().lower()] = int(row[1])
with open('negative.tsv', 'r', encoding='utf-8') as f:
    for row in csv.reader(f, delimiter='\t'):
        if len(row) >= 2: lexicon[row[0].strip().lower()] = int(row[1])

text = 'aplikasi ini keren banget proses bayar sangat cepat dan cs ramah membantu lalu klik analisis model indobert akan mendeteksi aspeknya misalnya layanan pelanggan atau pembayaran sedangkan sistem lexicon harusnya akan menampilkan sentimen positif karena mendeteksi kata keren cepat ramah'
words = text.split()
scores = {w: lexicon.get(w, 0) for w in words}
print('Total:', sum(scores.values()))
print('Details:', {k:v for k,v in scores.items() if v != 0})

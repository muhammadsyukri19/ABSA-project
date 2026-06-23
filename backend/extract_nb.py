import json

with open('notebook/Notebook_ProyekAkhir_Kelompok08.ipynb', encoding='utf-8') as f:
    d = json.load(f)

cells = [c['source'] for c in d['cells'] if c['cell_type'] == 'code']

with open('notebook_code.py', 'w', encoding='utf-8', errors='ignore') as f:
    f.write('\n#CELL\n'.join([''.join(c) for c in cells]))

@echo off
echo Menginstal dependensi backend Python...
pip install -r requirements.txt
echo Dependensi berhasil diinstal.
echo.
echo Menjalankan server Flask...
python app.py
pause

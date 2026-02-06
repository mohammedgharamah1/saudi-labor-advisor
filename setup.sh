#!/bin/bash
echo "=== إعداد مستشارك العمالي ==="
cd "$(dirname "$0")"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo ""
echo "=== تم التثبيت بنجاح ==="
echo "لتشغيل الموقع، شغّل:"
echo "  cd ~/projects/saudi-labor-advisor"
echo "  source venv/bin/activate"
echo "  python3 app.py"
echo ""
echo "ثم افتح المتصفح على: http://127.0.0.1:5000"

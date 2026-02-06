#!/bin/bash
cd "$(dirname "$0")"

echo "==============================="
echo "  رفع المشروع على GitHub"
echo "==============================="
echo ""

# Initialize git
echo ">> تهيئة Git..."
git init
echo ""

# Add files (NOT config.js or .env)
echo ">> إضافة الملفات..."
git add .gitignore index.html style.css app.js labor-law.js README.md requirements.txt setup.sh
echo ""

# Show status
echo ">> الملفات المضافة:"
git status --short
echo ""

# Commit
echo ">> إنشاء الـ Commit..."
git commit -m "Initial commit: Saudi Labor Law HR Assistant

AI-powered web tool that helps HR professionals understand and comply
with Saudi Labor Law using RAG approach with Gemini AI."
echo ""

# Create repo and push
echo ">> إنشاء الريبو على GitHub والرفع..."
gh repo create saudi-labor-advisor --public --description "AI-powered HR assistant for Saudi Labor Law compliance" --source . --push
echo ""

echo "==============================="
echo "  تم الرفع بنجاح!"
echo "==============================="
echo ""
echo "رابط المشروع:"
echo "https://github.com/mohammedgharamah1/saudi-labor-advisor"
echo ""
echo "اضغط أي زر للإغلاق..."
read -n 1

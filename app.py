import os
import google.generativeai as genai
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))

# System prompt - the user never sees this
SYSTEM_PROMPT = """أنت مستشار قانوني متخصص في نظام العمل السعودي.

القواعد:
1. أجب فقط عن المسائل المتعلقة بنظام العمل السعودي.
2. إذا كان السؤال خارج نطاق نظام العمل، اعتذر بلطف ووضح أن تخصصك هو نظام العمل السعودي فقط.
3. اشرح بأسلوب بسيط وسهل يفهمه أي شخص غير متخصص.
4. اذكر رقم المادة من نظام العمل السعودي إن أمكن.
5. وضح حقوق العامل وصاحب العمل بشكل متوازن.
6. أضف في النهاية تنبيه: "هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي أو وزارة الموارد البشرية."
7. رتب إجابتك بشكل واضح باستخدام عناوين ونقاط.
8. لا تتجاوز 300 كلمة في الرد.

مشكلة المستخدم:
"""


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/ask", methods=["POST"])
def ask():
    user_question = request.json.get("question", "").strip()

    if not user_question:
        return jsonify({"error": "الرجاء كتابة مشكلتك أولاً"}), 400

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(SYSTEM_PROMPT + user_question)
        return jsonify({"answer": response.text})
    except Exception as e:
        return jsonify({"error": "حدث خطأ في معالجة طلبك. حاول مرة أخرى."}), 500


if __name__ == "__main__":
    # Load .env file manually
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ[key.strip()] = value.strip()
        genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))

    app.run(debug=True, port=5000)

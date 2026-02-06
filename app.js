// Load API key from config.js (not uploaded to GitHub for security)
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `أنت مساعد ذكي لقسم الموارد البشرية، متخصص في نظام العمل السعودي.

دورك: مساعدة مسؤولي HR والمدراء على فهم نظام العمل السعودي والالتزام به.

=== المرجع: مواد نظام العمل السعودي ===
${LABOR_LAW_ARTICLES}
=== نهاية المرجع ===

القواعد الصارمة:
1. أجب فقط بناءً على مواد النظام المرفقة أعلاه.
2. اذكر رقم المادة بدقة كما هو في المرجع.
3. إذا كان السؤال لا تغطيه المواد المرفقة، قل بوضوح: "هذا السؤال يحتاج مراجعة نص النظام كاملاً أو استشارة محامي متخصص" ولا تتخيل إجابة.
4. لا تخترع أرقام مواد غير موجودة في المرجع.
5. إذا كان السؤال خارج نطاق نظام العمل، اعتذر ووضح أن تخصصك هو نظام العمل السعودي فقط.
6. اشرح بأسلوب بسيط وسهل.
7. وضح الإجراء النظامي الصحيح للشركة.
8. أضف في النهاية: "هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية."
9. رتب إجابتك بعناوين ونقاط.
10. لا تتجاوز 300 كلمة.

سؤال مسؤول الموارد البشرية:
`;

function useExample(btn) {
    const text = btn.querySelector("span:last-child").textContent;
    document.getElementById("question").value = text;
    document.getElementById("question").focus();
}

function newQuestion() {
    document.getElementById("question").value = "";
    document.getElementById("answer-section").classList.add("hidden");
    document.getElementById("processing-info").classList.add("hidden");
    document.getElementById("examples").classList.remove("hidden");
    document.getElementById("question").focus();

    // Reset processing steps
    document.querySelectorAll(".p-step").forEach(function (step) {
        step.classList.remove("active", "done");
    });
}

function animateProcessing() {
    const processingInfo = document.getElementById("processing-info");
    processingInfo.classList.remove("hidden");

    const steps = ["p-step-1", "p-step-2", "p-step-3", "p-step-4"];
    let i = 0;

    const interval = setInterval(function () {
        if (i > 0) {
            document.getElementById(steps[i - 1]).classList.remove("active");
            document.getElementById(steps[i - 1]).classList.add("done");
        }
        if (i < steps.length) {
            document.getElementById(steps[i]).classList.add("active");
            i++;
        } else {
            clearInterval(interval);
        }
    }, 800);

    return interval;
}

async function submitQuestion() {
    const question = document.getElementById("question").value.trim();
    if (!question) return;

    const btnText = document.getElementById("btn-text");
    const btnLoading = document.getElementById("btn-loading");
    const submitBtn = document.getElementById("submit-btn");
    const answerSection = document.getElementById("answer-section");
    const answerContent = document.getElementById("answer-content");
    const errorSection = document.getElementById("error-section");
    const examples = document.getElementById("examples");

    // Show loading
    btnText.classList.add("hidden");
    btnLoading.classList.remove("hidden");
    submitBtn.disabled = true;
    answerSection.classList.add("hidden");
    errorSection.classList.add("hidden");
    examples.classList.add("hidden");

    // Reset processing steps
    document.querySelectorAll(".p-step").forEach(function (step) {
        step.classList.remove("active", "done");
    });

    // Start processing animation
    const processingInterval = animateProcessing();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: SYSTEM_PROMPT + question }],
                    },
                ],
            }),
        });

        const data = await response.json();

        // Complete all processing steps
        clearInterval(processingInterval);
        document.querySelectorAll(".p-step").forEach(function (step) {
            step.classList.remove("active");
            step.classList.add("done");
        });

        // Short delay to show completion
        await new Promise(function (resolve) {
            setTimeout(resolve, 500);
        });

        document.getElementById("processing-info").classList.add("hidden");

        if (data.error) {
            document.getElementById("error-content").textContent =
                "حدث خطأ: " + data.error.message;
            errorSection.classList.remove("hidden");
            examples.classList.remove("hidden");
        } else {
            const answer = data.candidates[0].content.parts[0].text;

            // Convert markdown to HTML
            let formatted = answer
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/### (.*?)(\n|$)/g, "<h4>$1</h4>")
                .replace(/## (.*?)(\n|$)/g, "<h3>$1</h3>")
                .replace(/\* (.*?)(\n|$)/g, "<li>$1</li>")
                .replace(/- (.*?)(\n|$)/g, "<li>$1</li>")
                .replace(/(<li>.*?<\/li>)+/gs, "<ul>$&</ul>")
                .replace(/<\/ul>\s*<ul>/g, "")
                .replace(/\n\n/g, "</p><p>")
                .replace(/\n/g, "<br>")
                .replace(/^/, "<p>")
                .replace(/$/, "</p>");

            answerContent.innerHTML = formatted;
            answerSection.classList.remove("hidden");
        }
    } catch (err) {
        clearInterval(processingInterval);
        document.getElementById("processing-info").classList.add("hidden");
        document.getElementById("error-content").textContent =
            "حدث خطأ في الاتصال: " + err.message;
        errorSection.classList.remove("hidden");
        examples.classList.remove("hidden");
    }

    // Reset button
    btnText.classList.remove("hidden");
    btnLoading.classList.add("hidden");
    submitBtn.disabled = false;
}

// Submit on Enter
document.getElementById("question").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitQuestion();
    }
});

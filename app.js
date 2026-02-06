// Load API key from config.js (not uploaded to GitHub for security)
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Demo responses for when API quota is exceeded
const DEMO_RESPONSES = [
    {
        keywords: ["غاب", "غياب", "تغيب", "بدون إذن"],
        answer: `**الإجراء النظامي لغياب الموظف بدون إذن**

**1. حسب المادة 80 من نظام العمل:**
يحق لصاحب العمل فسخ العقد دون مكافأة أو تعويض إذا تغيب العامل:
- أكثر من **30 يوماً متفرقة** خلال السنة الواحدة
- أكثر من **15 يوماً متتالية** بدون سبب مشروع

**2. الإجراء الصحيح للشركة:**
- توثيق أيام الغياب بشكل رسمي
- إرسال إنذار كتابي للموظف بعد 5 أيام غياب
- إرسال إنذار ثاني بعد 10 أيام
- بعد 15 يوماً متتالية أو 30 متفرقة: يحق لكم الفسخ

**3. ملاحظة مهمة:**
- يجب إثبات أن الغياب بدون سبب مشروع
- إذا قدم الموظف عذراً طبياً معتمداً، لا يُحتسب من الغياب

⚠️ هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية.`
    },
    {
        keywords: ["مكافأة", "نهاية الخدمة", "نهاية خدمة"],
        answer: `**حساب مكافأة نهاية الخدمة**

**1. طريقة الحساب (المادة 84):**
- أجر **نصف شهر** عن كل سنة من السنوات الخمس الأولى
- أجر **شهر كامل** عن كل سنة بعد ذلك
- تُحسب على آخر أجر كان يتقاضاه الموظف

**2. في حالة الاستقالة (المادة 85):**
- **ثلث المكافأة**: خدمة من سنتين إلى 5 سنوات
- **ثلثا المكافأة**: خدمة من 5 إلى 10 سنوات
- **المكافأة كاملة**: أكثر من 10 سنوات

**3. مثال عملي:**
موظف خدم 8 سنوات وراتبه 10,000 ريال:
- أول 5 سنوات: 5,000 × 5 = 25,000 ريال
- آخر 3 سنوات: 10,000 × 3 = 30,000 ريال
- **الإجمالي: 55,000 ريال**

**4. استثناء (المادة 86):**
تُدفع كاملة إذا تركت الموظفة العمل خلال 6 أشهر من زواجها أو 3 أشهر من الوضع.

⚠️ هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية.`
    },
    {
        keywords: ["تجربة", "فترة التجربة", "تمديد التجربة"],
        answer: `**فترة التجربة وتمديدها**

**1. المدة الأساسية (المادة 53 مكرر):**
- لا تزيد عن **90 يوماً** (3 أشهر)
- لا تشمل إجازة عيد الفطر والأضحى والإجازات المرضية

**2. التمديد:**
- يجوز تمديدها باتفاق **مكتوب** بين الطرفين
- الحد الأقصى بعد التمديد: **180 يوماً** (6 أشهر)

**3. إنهاء العقد خلال التجربة:**
- يحق لأي طرف إنهاء العقد خلال فترة التجربة
- بدون تعويض أو مكافأة نهاية خدمة

**4. شروط مهمة (المادة 54):**
- يجب النص على فترة التجربة **صراحة** في عقد العمل
- إذا لم تُذكر في العقد، يُعتبر الموظف مُثبتاً من أول يوم
- لا يجوز وضع الموظف تحت التجربة مرتين عند نفس صاحب العمل

⚠️ هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية.`
    },
    {
        keywords: ["نقل", "رفض النقل", "نقل لفرع"],
        answer: `**نقل الموظف وحقوق الشركة**

**1. حسب المادة 58:**
- لا يجوز نقل العامل إلى مكان آخر يقتضي تغيير محل إقامته إذا كان النقل يُلحق به **ضرراً جسيماً** ولم يكن له **سبب مشروع**

**2. متى يحق للشركة النقل:**
- إذا كان النقل منصوصاً عليه في عقد العمل
- إذا كان النقل لا يُلحق ضرراً جسيماً بالموظف
- إذا كان هناك سبب مشروع تقتضيه مصلحة العمل

**3. إذا رفض الموظف النقل المشروع:**
- يُعتبر رفضه إخلالاً بالتزاماته التعاقدية
- يمكن اتخاذ الإجراءات التأديبية النظامية

**4. نصيحة للشركة:**
- وثّقوا أسباب النقل كتابياً
- أبلغوا الموظف رسمياً بقرار النقل
- أعطوه مهلة معقولة للترتيب

⚠️ هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية.`
    },
    {
        keywords: ["ساعات", "عمل إضافي", "أوفرتايم", "إضافي"],
        answer: `**ساعات العمل والعمل الإضافي**

**1. ساعات العمل العادية (المادة 98):**
- **8 ساعات** يومياً أو **48 ساعة** أسبوعياً
- في رمضان: **6 ساعات** يومياً أو **36 ساعة** أسبوعياً

**2. فترات الراحة (المادة 101):**
- يجب أن تتخلل ساعات العمل فترة للصلاة والطعام لا تقل عن **نصف ساعة**

**3. أجر العمل الإضافي (المادة 104):**
- أجر الساعة العادية + **50%** إضافية
- مثال: إذا أجر الساعة 50 ريال، الإضافي = 75 ريال

**4. يوم الراحة (المادة 106):**
- يوم الجمعة هو يوم الراحة الأسبوعية
- يجوز لصاحب العمل استبداله بيوم آخر

⚠️ هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية.`
    },
    {
        keywords: ["فصل", "فسخ", "إنهاء", "نفصل", "كيف نفصل"],
        answer: `**فصل الموظف بشكل نظامي**

**1. الفصل بسبب مشروع (المادة 80):**
يحق للشركة فسخ العقد بدون مكافأة أو تعويض في هذه الحالات:
- الاعتداء على صاحب العمل أو المدير
- عدم أداء الالتزامات الجوهرية
- سوء السلوك أو عدم الأمانة
- الغياب أكثر من 30 يوماً متفرقة أو 15 متتالية بدون عذر
- إفشاء أسرار العمل
- الغش وقت التعيين

**2. الفصل بدون سبب مشروع (المادة 77):**
يستحق الموظف تعويضاً:
- عقد غير محدد: أجر **15 يوماً** عن كل سنة خدمة
- عقد محدد: أجر **المدة الباقية** من العقد
- بحد أدنى: أجر **شهرين**

**3. فترة الإشعار (المادة 75):**
- يجب إشعار الموظف قبل **60 يوماً** (راتب شهري)
- أو **30 يوماً** لغير ذلك

**4. نصيحة مهمة:**
- وثّقوا كل المخالفات والإنذارات
- التزموا بالإجراء التأديبي المتدرج
- احتفظوا بملف كامل للموظف

⚠️ هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية.`
    },
    {
        keywords: ["إجازة", "إجازات", "إجازة سنوية"],
        answer: `**الإجازات في نظام العمل السعودي**

**1. الإجازة السنوية (المادة 109):**
- **21 يوماً** إذا كانت الخدمة أقل من 5 سنوات
- **30 يوماً** إذا أكمل 5 سنوات فأكثر
- مدفوعة الأجر بالكامل

**2. إجازات الأعياد والمناسبات (المادة 112):**
- عيد الفطر: 4 أيام
- عيد الأضحى: 4 أيام
- اليوم الوطني: يوم واحد

**3. الإجازات الشخصية (المادة 113):**
- الزواج: 5 أيام
- ولادة مولود: 3 أيام
- وفاة زوج/أصل/فرع: 5 أيام

**4. الإجازة المرضية (المادة 115):**
- أول 30 يوماً: أجر كامل
- الـ60 يوماً التالية: 75% من الأجر
- آخر 30 يوماً: بدون أجر

⚠️ هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية.`
    },
];

const DEFAULT_DEMO = `**مساعد الموارد البشرية**

شكراً لسؤالك! أنا هنا لمساعدتك في كل ما يتعلق بنظام العمل السعودي.

**يمكنني مساعدتك في مواضيع مثل:**
- إجراءات فصل الموظف بشكل نظامي
- حساب مكافأة نهاية الخدمة
- فترة التجربة وتمديدها
- ساعات العمل والعمل الإضافي
- الإجازات بأنواعها
- نقل الموظفين وحقوق الشركة
- التعامل مع غياب الموظفين

**جرب تسأل سؤال محدد مثل:**
- "موظف غاب 10 أيام بدون إذن، وش الإجراء النظامي؟"
- "كيف نحسب مكافأة نهاية الخدمة؟"
- "كيف نفصل موظف بشكل نظامي؟"

⚠️ هذا توضيح عام وليس استشارة قانونية رسمية. للحالات الخاصة راجع محامي متخصص أو وزارة الموارد البشرية.`;

function getDemoResponse(question) {
    let bestMatch = null;
    let bestScore = 0;
    for (const entry of DEMO_RESPONSES) {
        const score = entry.keywords.filter(kw => question.includes(kw)).length;
        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry.answer;
        }
    }
    return bestMatch || DEFAULT_DEMO;
}

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
            // Fallback to demo response
            const demoAnswer = getDemoResponse(question);
            let formatted = demoAnswer
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
        document.querySelectorAll(".p-step").forEach(function (step) {
            step.classList.remove("active");
            step.classList.add("done");
        });
        await new Promise(function (resolve) { setTimeout(resolve, 500); });
        document.getElementById("processing-info").classList.add("hidden");

        // Fallback to demo response
        const demoAnswer = getDemoResponse(question);
        let formatted = demoAnswer
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

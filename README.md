# Saudi Labor Law HR Assistant

Built this tool to help HR teams deal with Saudi Labor Law questions without needing to dig through legal documents every time. The idea is simple: you type your question in plain Arabic, and the app finds the relevant law article and gives you a clear answer with the article number.

I used a RAG (Retrieval-Augmented Generation) approach here, meaning the AI doesn't just guess — it actually references the real labor law text I embedded in the app. This keeps the answers accurate and grounded in actual legal articles.

## Tech

HTML, CSS, JavaScript on the frontend. Groq API with Llama 3.3 70B handles the AI part. The labor law articles are stored locally in `labor-law.js` and fed into the prompt so the model always has the legal context it needs.

## How to run it

Clone the repo and create a `config.js` file in the root:

```javascript
const GROQ_API_KEY = "your-groq-api-key";
```

You can get a free key from [Groq Console](https://console.groq.com). Then just open `index.html` in your browser.

There's also a live version here: https://mohammedgharamah1.github.io/saudi-labor-advisor

## What it covers

The app references the Saudi Labor Law (Royal Decree No. M/51) and its amendments, including employment contracts, probation periods, wages, working hours, overtime, leave policies, termination procedures, end-of-service benefits, and women's employment rights.

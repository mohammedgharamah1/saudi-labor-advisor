# Saudi Labor Law HR Assistant

A web application that helps HR professionals understand and comply with Saudi Labor Law. Users describe their workplace situation in plain Arabic, and the system automatically analyzes the query, matches it against actual labor law articles, and provides a clear answer citing the relevant legal article numbers.

## Features

- **Plain language input**: No legal knowledge required - ask in your own words
- **AI-powered analysis**: Automatically matches questions to relevant labor law articles
- **RAG approach**: Uses actual Saudi Labor Law text to minimize AI hallucination
- **Article citations**: Every answer includes the relevant article number
- **Arabic RTL interface**: Designed for Arabic-speaking HR professionals

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **AI**: Google Gemini API
- **Approach**: Retrieval-Augmented Generation (RAG) with Prompt Engineering

## How It Works

1. User types a question in plain Arabic
2. The system combines the question with a pre-built prompt and the actual labor law articles
3. The AI analyzes the question against the real law text
4. A clear answer is returned with the relevant article number

## Setup

1. Clone the repository:
```bash
git clone https://github.com/mohammedgharamah1/saudi-labor-advisor.git
cd saudi-labor-advisor
```

2. Create a `config.js` file with your Gemini API key:
```javascript
const GEMINI_API_KEY = "your-api-key-here";
```

3. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey)

4. Open `index.html` in your browser

## Legal Reference

This tool references the Saudi Labor Law (Royal Decree No. M/51) and its amendments, covering:
- Employment contracts and probation periods
- Wages and deductions
- Working hours and overtime
- Annual, sick, and personal leave
- Contract termination procedures
- End-of-service benefits
- Women's employment rights

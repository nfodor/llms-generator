# llms-generator

**`llms-generator`** is a Node.js library designed to streamline the creation of `llms.txt` and `llms-full.txt` files. These files enable indexing of API documentation for **automated** and **optimized use** by Large Language Models (LLMs) like ChatGPT, GitHub Copilot, Anthropic's Claude, and others.

---

## Why Use `llms-generator`?

### The Goal
The primary goal of this library is to make your API documentation **readable, structured, and AI-ready**. By generating standardized files like `llms.txt`, you ensure that your APIs are easily indexed by LLMs, allowing developers and tools to interact with them effectively and automatically.

### Why It's Important
- **Enhance Developer Experience**: By enabling LLMs to provide accurate, real-time responses about your APIs, you make it easier for developers to integrate with your services.
- **Boost Productivity**: LLMs using structured documentation can assist developers by auto-generating code, troubleshooting, and answering questions without diving into extensive manuals.
- **Prepare for the Future**: As AI tools become central to development workflows, having AI-optimized documentation ensures your APIs remain accessible and competitive.
- **Efficiency and Cost**: The `llms.txt` format is **token-efficient**, reducing processing costs while maintaining accuracy for LLM queries.

---

## What is `llms.txt`?

The **`llms.txt` standard** is an emerging web convention for providing structured, concise, and optimized documentation for AI systems. It serves as a guide for LLMs to understand the structure, purpose, and usage of your APIs.

### Key Features of `llms.txt`:
- **AI Optimization**: Enables seamless integration with AI developer tools.
- **Structured Content**: Provides information in a clear, token-efficient format.
- **Interoperability**: Complements standards like `robots.txt` and `sitemap.xml`.

### Example `llms.txt`
```plaintext
# llms.txt - Optimized Documentation for AI Developer Tools

project_name: ExampleAPI
version: 1.0
description: An API for text analysis and sentiment scoring.
base_url: https://api.example.com
docs_url: https://docs.example.com

# API Endpoints
endpoints:
  - /v1/analyze
  - /v1/sentiment

# Authentication
auth_method: API Key
auth_details: Pass the API key in the Authorization header.

# SDKs
sdks:
  - language: Python
    sdk_url: https://github.com/example/python-sdk
  - language: JavaScript
    sdk_url: https://github.com/example/js-sdk

# Support
support_contact: support@example.com
support_url: https://support.example.com
```

---

## Installation

To use `llms-generator`, install it via npm:

```bash
npm install llms-generator
```

---

## Usage

### Programmatic Usage
Generate `llms.txt` and `llms-full.txt` files programmatically:
```javascript
const { generateLLMSFiles } = require('llms-generator');

// Generate files from a JSON configuration
generateLLMSFiles('./path/to/input.json', './output/directory');
```

### Express Integration
Serve `llms.txt` and `llms-full.txt` dynamically in an Express app:
```javascript
const express = require('express');
const { use } = require('llms-generator');

const app = express();
const jsonInput = {
    "project_name": "ExampleAPI",
    "version": "1.0",
    "description": "An API for text analysis and sentiment scoring.",
    "base_url": "https://api.example.com",
    "docs_url": "https://docs.example.com",
    "endpoints": [
        "/v1/analyze",
        "/v1/sentiment"
    ],
    "auth": {
        "method": "API Key",
        "details": "Pass the API key in the Authorization header."
    },
    "rate_limit": "100 requests per minute",
    "rate_limit_upgrade_url": "https://example.com/upgrade",
    "sdks": [
        {
            "language": "Python",
            "sdk_url": "https://github.com/example/python-sdk"
        },
        {
            "language": "JavaScript",
            "sdk_url": "https://github.com/example/js-sdk"
        }
    ],
    "support": {
        "contact": "support@example.com",
        "url": "https://support.example.com"
    }
};
const outputDir = './output/directory';

use(app, jsonInput, outputDir);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
```

Once integrated, the following routes will be available:
- `http://localhost:3000/llms.txt`
- `http://localhost:3000/llms-full.txt`

### CLI Usage
You can also run `llms-generator` from the command line:
```bash
npx llms-generator ./path/to/input.json ./output/directory
```

---

## License

This project is open for use with the condition that credit is given to the author.  

**Author**: Nicolas Fodor  

### License Terms:
You may use, modify, and distribute this project freely, provided you include the following acknowledgment in any distributed versions or derivative works:

```
This project uses llms-generator by Nicolas Fodor.
```

For commercial usage, please contact the author directly.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## Contact

For support or inquiries, please contact:
- **Email**: npm@fodor.net

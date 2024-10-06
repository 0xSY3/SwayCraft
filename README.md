# SwayCraft: AI-Powered Development Assistant for Fuel Blockchain

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [AI Integration](#ai-integration)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Introduction

SwayCraft is an AI-powered development assistant specifically designed for the Fuel blockchain ecosystem. Built during the Encode x Fuel Hackathon, SwayCraft aims to streamline the development process for Fuel, making it easier for both newcomers and experienced developers to build efficient and secure smart contracts using Sway, Fuel's native smart contract language.

Unlike general-purpose AI tools, SwayCraft is tailored to understand the intricacies of Fuel's architecture and Sway's syntax, providing context-aware assistance that's directly applicable to Fuel blockchain development.

## Features

### 1. AI-Assisted Code Generation
- Generate Sway smart contract templates
- Provide Fuel-specific code snippets
- Offer explanations for generated code

### 2. Interactive AI Chat Assistant
- Answer Fuel and Sway-related questions
- Provide explanations on Fuel's unique features (e.g., predicates, UTXO model)
- Offer debugging assistance and best practices

### 3. Syntax Highlighting
- Real-time syntax highlighting for Sway code

### 4. Code Conversion (Planned)
- Convert pseudo-code to Sway
- Assist in migrating Solidity contracts to Sway

## Architecture

SwayCraft is built using a modern tech stack:

- Frontend: React with TypeScript
- State Management: Redux
- Styling: Tailwind CSS
- AI Integration: OpenAI API and Anthropic's Claude API

The application follows a client-server architecture:

1. The React frontend handles user interactions and displays responses.
2. API requests are sent to our backend server.
3. The backend processes requests and interacts with AI services (OpenAI and Claude).
4. AI-generated responses are sent back to the frontend for display.

## Installation

1. Clone the repository:

```
  https://github.com/0xSY3/SwayCraft
```

3. Install dependencies:
   
```
npm install
```
  
4. Create a `.env` file in the root directory and add your API keys.
5. Run Development Server.

```
npm run dev
```

## Usage

1. Open SwayCraft in your browser (default: `http://localhost:3000`).
2. Use the code generation feature by entering a prompt in the main input field.
3. Access the AI chat assistant by clicking the "Ask AI" button in the header.
4. Explore generated code and AI responses in the interface.

## AI Integration

SwayCraft leverages two powerful AI models to provide comprehensive assistance:

### OpenAI GPT-3.5
- Primary use: Code generation and initial query processing
- Strengths: Broad knowledge base, strong code generation capabilities

### Anthropic's Claude
- Primary use: Detailed explanations and Fuel-specific knowledge
- Strengths: Nuanced understanding, ability to provide detailed technical explanations

Our backend uses a custom routing system to direct queries to the most appropriate AI model based on the type of assistance required.

## Roadmap

- [ ] Implement compile and test functions for Sway contracts
- [ ] Integrate with Fuel's block explorer for real-time contract analysis
- [ ] Add automated testing suggestions
- [ ] Implement gas optimization recommendations
- [ ] Expand predicate implementation assistance
- [ ] Develop a plugin system for IDE integration (VSCode, IntelliJ)
- [ ] Create a community contribution system for verified code snippets and examples

## Contributing

We welcome contributions to SwayCraft! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get started.

## License

SwayCraft is released under the [MIT License](LICENSE).

---

Built with ❤️ for the Fuel ecosystem.



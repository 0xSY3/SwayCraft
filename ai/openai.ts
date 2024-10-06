import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// System messages for different contract types
const systemMessages = {
  general: `You are an expert smart contract developer familiar with Sway and the Fuel blockchain. You assist in creating, analyzing, and optimizing smart contracts based on user requirements.`,
  defi: `You are a DeFi specialist and smart contract developer expert in Sway and the Fuel blockchain. You focus on creating secure and efficient decentralized finance protocols.`,
  nft: `You are an NFT and digital asset specialist proficient in Sway and the Fuel blockchain. You excel in creating smart contracts for minting, trading, and managing non-fungible tokens.`,
  dao: `You are a DAO (Decentralized Autonomous Organization) expert and smart contract developer specializing in Sway and the Fuel blockchain. You create governance and voting systems for decentralized organizations.`,
  gaming: `You are a blockchain gaming specialist with expertise in Sway and the Fuel blockchain. You develop smart contracts for in-game assets, rewards, and game logic.`
};

// Error types
enum ErrorType {
  API_ERROR = "API_ERROR",
  RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR",
  INVALID_REQUEST_ERROR = "INVALID_REQUEST_ERROR",
  CONTEXT_LENGTH_EXCEEDED = "CONTEXT_LENGTH_EXCEEDED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

// Custom error class
class SmartContractError extends Error {
  type: ErrorType;

  constructor(message: string, type: ErrorType) {
    super(message);
    this.name = "SmartContractError";
    this.type = type;
  }
}

// Helper function to handle API errors
function handleApiError(error: any): never {
  console.error("OpenAI API Error:", error);

  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 429:
        throw new SmartContractError("Rate limit exceeded. Please try again later.", ErrorType.RATE_LIMIT_ERROR);
      case 400:
        throw new SmartContractError("Invalid request. Please check your input.", ErrorType.INVALID_REQUEST_ERROR);
      case 401:
        throw new SmartContractError("Authentication error. Please check your API key.", ErrorType.API_ERROR);
      case 500:
        throw new SmartContractError("OpenAI server error. Please try again later.", ErrorType.API_ERROR);
      default:
        throw new SmartContractError(`API error: ${data.error.message}`, ErrorType.API_ERROR);
    }
  } else if (error.message.includes("maximum context length")) {
    throw new SmartContractError("Input too long. Please reduce the size of your request.", ErrorType.CONTEXT_LENGTH_EXCEEDED);
  } else {
    throw new SmartContractError("An unknown error occurred.", ErrorType.UNKNOWN_ERROR);
  }
}

// Helper function to validate input
function validateInput(input: string, maxLength: number = 4000): void {
  if (!input || input.trim().length === 0) {
    throw new SmartContractError("Input cannot be empty.", ErrorType.INVALID_REQUEST_ERROR);
  }
  if (input.length > maxLength) {
    throw new SmartContractError(`Input exceeds maximum length of ${maxLength} characters.`, ErrorType.INVALID_REQUEST_ERROR);
  }
}

// Main function to interact with OpenAI API
async function getCompletion(messages: ChatCompletionMessageParam[], model: string = "gpt-3.5-turbo"): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
    });

    return completion.choices[0].message.content || "";
  } catch (error) {
    return handleApiError(error);
  }
}

// Function to write pseudo code
export async function writeFirstPseudoCode(title: string, contractType: keyof typeof systemMessages = "general"): Promise<{ response: string }> {
  validateInput(title);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages[contractType] },
    { role: "user", content: `Write pseudo code for a smart contract titled: ${title}` }
  ];

  try {
    const response = await getCompletion(messages);
    return { response };
  } catch (error) {
    console.error('Error in writeFirstPseudoCode:', error);
    throw error;
  }
}

// Function to start a new contract
export async function startNewContract(purpose: string, pseudo: string, contractType: keyof typeof systemMessages = "general"): Promise<string> {
  validateInput(purpose);
  validateInput(pseudo);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages[contractType] },
    { role: "user", content: `Create a smart contract for ${purpose} based on this pseudo code: ${pseudo}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in startNewContract:', error);
    throw error;
  }
}

// Function to update smart contract
export async function updateSmartContract(messages: ChatCompletionMessageParam[], contractType: keyof typeof systemMessages = "general"): Promise<string> {
  const fullMessages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages[contractType] },
    ...messages
  ];

  try {
    return await getCompletion(fullMessages);
  } catch (error) {
    console.error('Error in updateSmartContract:', error);
    throw error;
  }
}

// Function to analyze smart contract security
export async function analyzeContractSecurity(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Analyze the security of the following smart contract and provide recommendations:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in analyzeContractSecurity:', error);
    throw error;
  }
}

// Function to optimize gas usage
export async function optimizeGasUsage(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Optimize the gas usage of the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in optimizeGasUsage:', error);
    throw error;
  }
}

// Function to generate contract documentation
export async function generateContractDocumentation(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Generate comprehensive documentation for the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in generateContractDocumentation:', error);
    throw error;
  }
}

// Function to suggest test cases
export async function suggestTestCases(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Suggest comprehensive test cases for the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in suggestTestCases:', error);
    throw error;
  }
}

// Function to explain contract functionality
export async function explainContractFunctionality(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Explain the functionality of the following smart contract in simple terms:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in explainContractFunctionality:', error);
    throw error;
  }
}

// Function to generate contract upgrade plan
export async function generateUpgradePlan(oldContract: string, newRequirements: string): Promise<string> {
  validateInput(oldContract);
  validateInput(newRequirements);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Generate an upgrade plan for the following smart contract to meet these new requirements:\n\nCurrent Contract:\n${oldContract}\n\nNew Requirements:\n${newRequirements}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in generateUpgradePlan:', error);
    throw error;
  }
}

// Function to compare two contracts
export async function compareContracts(contract1: string, contract2: string): Promise<string> {
  validateInput(contract1);
  validateInput(contract2);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Compare the following two smart contracts and highlight the differences:\n\nContract 1:\n${contract1}\n\nContract 2:\n${contract2}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in compareContracts:', error);
    throw error;
  }
}

// Function to suggest optimization strategies
export async function suggestOptimizations(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Suggest optimization strategies for the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in suggestOptimizations:', error);
    throw error;
  }
}

// Function to generate contract interfaces
export async function generateContractInterfaces(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Generate interfaces for the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in generateContractInterfaces:', error);
    throw error;
  }
}

// Function to suggest error handling improvements
export async function suggestErrorHandling(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Suggest improvements for error handling in the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in suggestErrorHandling:', error);
    throw error;
  }
}

// Function to generate events and logging
export async function generateEventsAndLogging(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Suggest appropriate events and logging for the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in generateEventsAndLogging:', error);
    throw error;
  }
}

// Function to suggest access control improvements
export async function suggestAccessControl(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Suggest improvements for access control in the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in suggestAccessControl:', error);
    throw error;
  }
}

// Function to generate deployment scripts
export async function generateDeploymentScripts(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Generate deployment scripts for the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in generateDeploymentScripts:', error);
    throw error;
  }
}

// Function to suggest scalability improvements
export async function suggestScalabilityImprovements(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Suggest scalability improvements for the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in suggestScalabilityImprovements:', error);
    throw error;
  }
}

// Function to generate contract migration plan
export async function generateMigrationPlan(oldContract: string, newPlatform: string): Promise<string> {
  validateInput(oldContract);
  validateInput(newPlatform);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Generate a migration plan to move the following smart contract to ${newPlatform}:\n\n${oldContract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in generateMigrationPlan:', error);
    throw error;
  }
}

// Function to suggest interoperability improvements
export async function suggestInteroperabilityImprovements(contract: string): Promise<string> {
  validateInput(contract);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemMessages.general },
    { role: "user", content: `Suggest improvements for interoperability in the following smart contract:\n\n${contract}` }
  ];

  try {
    return await getCompletion(messages);
  } catch (error) {
    console.error('Error in suggestInteroperabilityImprovements:', error);
    throw error;
  }
}
export const createFuelSwayConfigFile = async (contract) => {
    const messages = [
      {
        role: 'system',
        content: `
        Create a configuration file for a Fuel Sway smart contract. The config should be in YAML format and include the following elements:
  
        - name: String name of the contract
        - sourceurl: URL of the contract source code
        - supportedstandards: List of standards supported (e.g., FIP-1 for fungible tokens)
        - events: List of events emitted by the contract
        - safemethods: List of safe methods that can be called without spending gas
        - permissions: List of permission rules for different addresses
  
        Ensure the following:
        - Only return the configuration text, without comments or explanations
        - Format the YAML correctly according to the contract
        `
      },
      {
        role: 'user',
        content: `Generate a configuration for the following Fuel Sway smart contract code:
        ${contract}`
      }
    ];
  
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 1,
      max_tokens: 512,
      top_p: 1
    });
  
    return completion.choices[0].message.content;
  };
  
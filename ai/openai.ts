import axios from "axios";
import OpenAI from "openai";

const configuration = {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? '',
  dangerouslyAllowBrowser: true
};

const openai = new OpenAI(configuration);
  

  const chat_completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: messages as any,
    temperature: 1,

    response_format: { type: "json_object" },
  });

  console.log(chat_completion)
  const chat = chat_completion.choices[0]

  try {
    const d = JSON.parse(chat.message?.content ?? '{}');
    return d;
  } catch (e) {
    console.log(e)
  }
}

export const startNewContract = async (purpose: string, requirements: string) => {

  const messages = [{
    'role': 'system',
    'content': systemRecord
  }, {
    'role': 'user',
    'content': `here's the pseudo code ${requirements}, and write neo-go framework supported code.`
  }, {
    'role': 'user',
    'content': `I want to write a smart contract for ${purpose}. Your response should be just the contract itself, no explaination, titles or intro required. Make sure to not start response withh \`\`\`.`
  },]

  const chat_completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: messages as any,
    temperature: 1,
  });

  console.log("here, first time depth 2", messages)
  console.log(chat_completion)
  const chat = chat_completion.choices[0]

  try {
    const d = chat.message?.content ?? ''
    return d;
  } catch (e) {
    console.log(e)
  }
}


export const updateSmartContract = async (messages: any[]) => {
  const chat_completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [...messages, {
      role: "user", content: `
      User can provide the same contract psuedo code but still you have to rethink on your approach. and write code.
      Update the smart contract by comparing the changes I did in psuedo code logics, don't change things that are not related to my updation,
      only reply with new contract. If nothing was changed in the pseudo code don't change anything. Dont write anything additinal for explaination.
    `}],
    temperature: 1,
    top_p: 1
  });

  console.log('c', chat_completion)
  const chat = chat_completion.choices[0]
  return chat.message?.content;
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
  
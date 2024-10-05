import axios from 'axios';
import { AxiosError } from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export async function makeRequest(messages: any[]) {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo-1106',
        messages: messages,
        temperature: 1,
        response_format: { type: 'json_object' },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 429) {
          retries++;
          console.warn(`Rate limit exceeded. Retrying in ${RETRY_DELAY}ms... (Attempt ${retries})`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  throw new Error('Max retries exceeded. Please try again later.');
}
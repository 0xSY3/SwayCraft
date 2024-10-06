import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { messages } = req.body

      const response = await axios.post(
        CLAUDE_API_URL,
        {
          model: "claude-3-opus-20240229",
          messages: messages,
          max_tokens: 1000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          },
        }
      )

      res.status(200).json(response.data)
    } catch (error) {
      console.error('Error calling Claude API:', error)
      res.status(500).json({ error: 'Error processing your request' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
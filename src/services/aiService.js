/**
 * AI Service for handling chatbot API calls
 * Uses Groq API (free tier available)
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Get AI response from Groq API
 * @param {string} userMessage - The user's message
 * @param {Array} chatHistory - Previous chat messages for context
 * @returns {Promise<string>} - The AI's response
 */
export async function getAIResponse(userMessage, chatHistory = []) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('API key not found. Please set VITE_GROQ_API_KEY in your .env file.');
  }

  // Build conversation history for context
  const messages = chatHistory
    .filter(msg => msg.message && typeof msg.message === 'string')
    .map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.message
    }));

  // Add current user message
  messages.push({
    role: 'user',
    content: userMessage
  });

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Fast and free model
        messages: [
          {
            role: 'system',
            content: `You are a helpful, friendly, and knowledgeable AI assistant. 
Your responses should be:
- Clear and well-formatted with proper line breaks for readability
- Conversational and natural, as if chatting with a friend
- Concise but comprehensive - provide enough detail without being verbose
- Use bullet points or line breaks when listing items or explaining steps
- Empathetic and understanding
- Accurate and helpful

Format your responses with proper spacing and structure for better readability.`
          },
          ...messages
        ],
        temperature: 0.8,
        max_tokens: 1500,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    }

    throw new Error('Unexpected API response format');
  } catch (error) {
    // Handle network errors or API errors
    if (error.message.includes('API key')) {
      throw error;
    }
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
}


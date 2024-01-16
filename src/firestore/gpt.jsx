export const getGptResponse = async (prompt) => {
    const apiKey = import.meta.env.VITE_GPT_KEY; // Replace with your actual API key
    const url = 'https://api.openai.com/v1/chat/completions';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Replace with the model you want to use
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant. You will generate JSON responses indicating how much protein, carbs, fats, and calories a certain food will have."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // This should be the response from the API
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
      throw error;
    }
  }
  
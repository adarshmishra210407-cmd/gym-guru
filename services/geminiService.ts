import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set securely
const ai = new GoogleGenAI({ apiKey });

// --- AI Coach (Form Analysis) ---

export const analyzeForm = async (imageBase64: string, exerciseName: string): Promise<string> => {
  if (!apiKey) return "System Error: API Key missing.";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `You are an elite calisthenics coach with the personality of the "System" from a leveling RPG.
    Analyze this image of a user performing a ${exerciseName}.
    
    Provide output in this format:
    1. **Status**: [Correct/Incorrect/Dangerous]
    2. **Correction**: specific cue to fix form (e.g., "Tuck elbows", "Engage core").
    3. **System Alert**: A short RPG-style message about their potential (e.g., "Agility deficiency detected").
    
    Keep it concise.`;

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64.split(',')[1] } },
          { text: prompt }
        ]
      }
    });

    return response.text || "Analysis failed. The System cannot perceive you clearly.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Connection with The System severed. Try again.";
  }
};

// --- Diet Generator ---

export const generateDietPlan = async (preferences: string): Promise<any> => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate a daily diet plan for a user with these goals/preferences: "${preferences}".
    
    CRITICAL INSTRUCTION: Design this diet specifically for an Indian Middle-Class family context (Budget-Friendly & Culturally Appropriate).
    
    1. **Ingredients**: Prioritize affordable, locally available items like:
       - Carbohydrates: Roti (Wheat), Rice, Oats, Poha, Suji.
       - Proteins: Dal (Lentils), Chana (Chickpeas), Rajma, Soya Chunks, Paneer, Milk, Curd, Eggs.
       - Fats: Mustard Oil, Ghee, Peanuts.
       - Vegetables: Seasonal local sabzi (Bhindi, Gobi, Aloo, Spinach/Palak, Lauki).
    
    2. **Cost**: Avoid expensive imported ingredients like Avocados, Berries, Quinoa, Salmon.
    
    3. **Format**: 
       - Meal Name: Simple Indian Dish (e.g., "Dal Chawal", "Paneer Bhurji").
       - Description: Include a short cooking tip or budget tip (e.g., "Use low oil tadka", "Soak dal for 2 hours").
    
    The output must be a strict JSON object matching the requested schema.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalCalories: { type: Type.NUMBER },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER },
              }
            },
            meals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  ingredients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");
    return JSON.parse(text);

  } catch (error) {
    console.error("Diet Gen Error:", error);
    throw error;
  }
};

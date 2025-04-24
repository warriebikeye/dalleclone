import express from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenAI, Modality } from '@google/genai'; // Import Gemini SDK

dotenv.config();

const router = express.Router();

// Initialize Gemini AI with your API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// New route to handle Gemini image generation
router.route('/').post(async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // Ensure prompt is a valid string
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt must be a valid string.' });
    }

    // Call Gemini's API to generate text and image
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation', // Verify model name
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Process response: Return image as base64 string
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        // Optionally return generated text
        res.status(200).json({ text: part.text });
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        
        // Return base64-encoded image directly in the response
        res.status(200).json({
          message: 'Image generated successfully!',
          image: `data:image/png;base64,${imageData}`,
        });
        return; // Return early to avoid sending more than one response
      }
    }

    // In case no image is generated
    res.status(500).json({ error: 'No image data found in the response' });
  } catch (error) {
    console.error('Error occurred while generating image:', error);

    if (error.response) {
      console.error('Gemini error response:', error.response.data); 
      res.status(500).json({ error: error.response?.data?.error?.message || 'An unknown error occurred' });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    } 
  }
});

export default router;

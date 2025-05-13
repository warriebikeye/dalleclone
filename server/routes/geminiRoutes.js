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

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt must be a valid string.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Collect text and image data
    let text = null;
    let imageData = null;

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        text = part.text;
      } else if (part.inlineData) {
        imageData = part.inlineData.data;
      }
    }

    if (imageData) {
      return res.status(200).json({
        message: 'Image generated successfully!',
        image: `data:image/png;base64,${imageData}`,
        ...(text && { text }), // include text if available
      });
    }

    return res.status(500).json({ error: 'No image data found in the response' });
  } catch (error) {
    console.error('Error occurred while generating image:', error);

    const errorMessage = error.response?.data?.error?.message || 'An unknown error occurred';
    return res.status(500).json({ error: errorMessage });
  }
});


export default router;

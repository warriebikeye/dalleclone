import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt must be a valid string.' });
    }
  
    const aiResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt:prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    console.log("AI Response:", aiResponse);

    const image = aiResponse.data[0]?.b64_json;

    if (!image) {
      return res.status(500).json({ error: 'Image generation failed, no image data found' });
    }

    res.status(200).json({ photo: image });
  } catch (error) { 
    console.error('Error occurred while generating image:', error);

    if (error.response) {
      console.error('OpenAI error response:', error.response.data);
      res.status(500).json({ error: error.response?.data?.error?.message || 'An unknown error occurred' });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});



export default router;

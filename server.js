import express from 'express';
import { AzureOpenAI } from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const endpoint = "https://hack-genai-openai.cognitiveservices.azure.com/";
const modelName = "gpt-5-mini";
const deployment = "gpt-5-mini-2";
const apiKey = process.env.AZURE_OPENAI_API_KEY;
console.log(apiKey)
const apiVersion = "2024-12-01-preview";

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        const client = new AzureOpenAI({
            endpoint,
            apiKey,
            deployment,
            apiVersion
        });

        const response = await client.chat.completions.create({
            messages,
            max_completion_tokens: 16384,
            model: modelName
        });

        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

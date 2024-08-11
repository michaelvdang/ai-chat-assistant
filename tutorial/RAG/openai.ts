// run manually: node --loader ts-node/esm openai.ts

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { openai } from '@ai-sdk/openai';
import { cosineSimilarity, embed, embedMany, generateText } from 'ai';
import { fileURLToPath } from 'url';
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);
dotenv.config();

async function main() {
  // connect to db, use pinecone or something similar, possibly postgres
  const db: { embedding: number[]; value: string }[] = [];

  const essay = fs.readFileSync(path.join(__dirname, 'short_essay.txt'), 'utf8');
  // const essay = fs.readFileSync(path.join(__dirname, 'essay.txt'), 'utf8');
  const chunks = essay
    .split('.')
    .map(chunk => chunk.trim())
    .filter(chunk => chunk.length > 0 && chunk !== '\n');

  const { embeddings } = await embedMany({
    model: openai.embedding('text-embedding-3-small'),
    values: chunks,
  });
  console.log(embeddings.slice(0, 3));
  embeddings.forEach((e, i) => {
    db.push({
      embedding: e,
      value: chunks[i],
    });
  });

  const input =
    'What schools did the auther applied and attend?';

  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: input,
  });

  console.log('userInput embedding', embedding);

  // retrieve context from db

  // generate top 3 matching embedding based on cosine similarity
  const context = db
    .map(item => ({
      document: item,
      similarity: cosineSimilarity(embedding, item.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)
    .map(r => r.document.value)
    .join('\n');

  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: `Answer the following question based only on the provided context:
             ${context}

             Question: ${input}`,
  });
  console.log(text);
}

main().catch(console.error);
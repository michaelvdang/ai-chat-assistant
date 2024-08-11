// modified from working sample, not making sense yet

import { pipeline, cos_sim } from '@xenova/transformers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const query = 'What did the author use to write his first program?';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const essay = fs.readFileSync(path.join(__dirname, 'short_essay.txt'), 'utf8');
console.log('Essay: ',essay.slice(0, 100));


const docs = [query].concat(essay
  .split('.')
  .map(chunk => chunk.trim())
  .filter(chunk => chunk.length > 0 && chunk !== '\n')
)



console.log('docs: ', docs.slice(0, 10));

// const embedder = await pipeline('feature-extraction', model='sentence-transformers/all-MiniLM-L6-v2');
const embedder = await pipeline('feature-extraction', 'mixedbread-ai/mxbai-embed-large-v1', {
    quantized: false, // Comment out this line to use the quantized version
});
const output = await embedder(docs, { pooling: 'cls' });

// Compute similarity scores
const [source_embeddings, ...document_embeddings ] = output.tolist();
const similarities = document_embeddings.map(x => cos_sim(source_embeddings, x));
console.log(similarities); // [0.7919578577247139, 0.6369278664248345, 0.16512018371357193, 0.3620778366720027]
console.log(similarities.reduce((a, b) => a + b, 0) / similarities.length)




// // import { pipeline } from '@huggingface/transformers';
// import { pipeline, cos_sim } from '@xenova/transformers';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Get the current file path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const essay = fs.readFileSync(path.join(__dirname, 'short_essay.txt'), 'utf8');
// console.log('Essay: ',essay.slice(0, 100));
// const chunks = essay
//   .split('.')
//   .map(chunk => chunk.trim())
//   .filter(chunk => chunk.length > 0 && chunk !== '\n');

// console.log('Chunks: ', chunks.slice(0, 10));
  
// // const embedder = await pipeline('feature-extraction', model='sentence-transformers/all-MiniLM-L6-v2');
// const embedder = await pipeline('feature-extraction', 'mixedbread-ai/mxbai-embed-large-v1', {
//   quantized: false, // Comment out this line to use the quantized version
// });
// const embedded_context = await embedder(chunks, { pooling: 'cls' });

// const embedded_query = await embedder('what did the author work on outside of school?', { pooling: 'cls' });

// console.log(typeof(embedded_query));
// console.log(embedded_query);
// console.log(embedded_query.tolist());

// const similarities = embedded_context.tolist().map(x => cos_sim(embedded_query.tolist(), x));
// console.log(similarities);


// import { pipeline, cos_sim } from '@xenova/transformers';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Generate sentence embeddings
// const docs = [
//   'Represent this sentence for searching relevant passages: A man is eating a piece of bread',
//   'A man is eating food.',
//   'A man is eating pasta.',
//   'The girl is carrying a baby.',
//   'A man is riding a horse.',
// ]

// // const embedder = await pipeline('feature-extraction', model='sentence-transformers/all-MiniLM-L6-v2');
// const embedder = await pipeline('feature-extraction', 'mixedbread-ai/mxbai-embed-large-v1', {
//     quantized: false, // Comment out this line to use the quantized version
// });
// const output = await embedder(docs, { pooling: 'cls' });

// // Compute similarity scores
// const [source_embeddings, ...document_embeddings ] = output.tolist();
// const similarities = document_embeddings.map(x => cos_sim(source_embeddings, x));
// console.log(similarities); // [0.7919578577247139, 0.6369278664248345, 0.16512018371357193, 0.3620778366720027]


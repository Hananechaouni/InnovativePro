import Replicate from 'replicate';
import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// Turn the project into a server that we can run locally on the localhost 3000
// Acts as a proxy that will send a request to the API in Replicate through the console
app.use(cors({ credentials: true, origin: '*'}));
app.options('*', cors({ credentials: true, origin: '*'}));
app.use(bodyParser.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
});

app.post('/', async (req, res) => {
  const prompt = req.body.prompt;
  const model = 'mistralai/mixtral-8x7b-instruct-v0.1:5d78bcd7a992c4b793465bcdcf551dc2ab9668d12bb7aa714557a21c1e77041c'
    const input = {
          top_k: 50,
          top_p: 0.9,
          prompt: prompt,
          temperature: 0.6,
          max_new_tokens: 1024,
          prompt_template: '<s>[INST] {prompt} [/INST] ',
          presence_penalty: 0,
          frequency_penalty: 0,
        }

    console.log({ model, input })
    console.log('Running...')
    const output = await replicate.run(model, { input })
    console.log('Done!', output);
    res.json({output});
  });

  app.listen(3000, () => {
    console.log(`App running on port ${3000}`);
  });
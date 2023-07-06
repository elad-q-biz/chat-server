const PORT = process.env.PORT || 8000; // Use the PORT value from the environment or default to 8000
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const OPEN_AI_SECRET = process.env.OPEN_AI_SECRET;

app.post('/completions', async (req, res) => {

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPEN_AI_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-16k',
      messages: req.body.messages,
      max_tokens: 16000,
      stream: true
    }),
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.error(err, 'error');
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

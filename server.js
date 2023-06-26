const PORT = 8000;
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()

dotenv.config()


app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })

const OPEN_AI_SECRET=process.env.OPEN_AI_SECRET;
app.post('/completions' , async (req,res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${OPEN_AI_SECRET}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user" , content: req.body.message}],
            max_tokens: 100
        })
    }
    try{
       const response = await fetch('https://api.openai.com/v1/chat/completions' , options)
       const data = await response.json()
       res.send(data)
    } catch(err){
        console.error(err)
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`) )
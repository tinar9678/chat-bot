import { Configuration, OpenAIApi } from "openai";
import express  from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

config();

const configuration = new Configuration({
    organization: "org-aGxICQwZD4MNNjeRcRACpwwr",
    apiKey: process.env.SECRET,
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3080;

/// Add cors and bodyparser to express.
app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user", 
            content: `The following AI tool helps readers identify 
            the sentiment of a given text. The sentiment the tool 
            can choose from are: 1. positive, 2. negative, or 3. 
            neutral. \n\n` +
            // content example 1
            `Input: I'm feeling confident about this solution!\n` +
            `Sentiment: positive\n` +
            // content example 2
            `Input: This is the worst day ever.\n` +
            `Sentiment: negative\n` +
            // actual use case
            `Input: ${message}\n` +
            `Sentiment:`}],
        max_tokens: 1,
        temperature: .6,
    });
    return res.json({
        data: completion.data.choices[0].message.content
    })
})
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
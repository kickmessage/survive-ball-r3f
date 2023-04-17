import { config } from "dotenv";
import { executeLeaderboardCRUD, connectToCluster } from "./leaderboardCRUD.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("testing testing")
})

app.post('/record/add', async (req,res) => {

    const record = {
        username: req.body.username,
        score: req.body.score
    }

    await executeLeaderboardCRUD(record, 'create');
    await res.send('Record CREATE success!');


})

app.get('/rankings/find/:username', async (req, res) => {

    try {
        const username = req.params.username;
        let records = await executeLeaderboardCRUD(username, 'get-user-rank');
        let response;
        let score = 0;

        for (let i = 0; i < records.length; i++) {
            if (parseInt(records[i].score) > score) response = records[i].score;
        }

        res.send(response);


    }
    catch (err) {
        console.error(err)
        //return blank response, error handling in executeLeaderboardCRUD() function
        res.end()

    }


})

app.get('/rankings/:range', async (req, res) => {

    try {
        const range = req.params.range.split('-');
        const startIndex = parseInt(range[0]);
        const endIndex = parseInt(range[1]);
        let response = await executeLeaderboardCRUD(
            {
                start: startIndex,
                end: endIndex
            }
        , 'get-rankings');
    res.send(response);

    }

    catch (err) {
        console.err(err)
        //return blank response, error handling in executeLeaderboardCRUD() function
        res.end()
    }




})

config();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);


})


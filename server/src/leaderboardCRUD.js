import { MongoClient } from "mongodb";
export async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas');

        return mongoClient;

    }
    catch(err) {
        console.error("Connection to MongoDB Atlas failed!", err);
        console.log('given uri: ', uri)
        process.exit();
    }

}

export async function executeLeaderboardCRUD(data, action) {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {

        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("records");
        const collection = db.collection("high-score");


        if (action === "create") {
            console.log("CREATE request recieved");
            await createLeaderboardEntry(collection, data)


        }

        if (action === "get-user-rank") {

            console.log("\n READ request recieved")
            console.log("Finding current record for username: ", data);
            let response = await findRecordsByUsername(collection, data);
            console.log('record: ', response[0].score, '\n');
            console.log('Returning record to client... \n');
            console.log(response)
            return response;


        }

        if (action==="get-rankings") {
            console.log('fetching top records of index: ', data, '\n');
            let response = await findRankings(collection, data.start, data.end);
            console.log('returning response to client... \n')
            return response;


        }

        if (action === "update") {

        }
        if (action === "delete") {


        }
    } 
    catch(err) {
        console.error(`\nerror attempting ${action} : \n`, err, '\n');
    }

    finally {
        //        await mongoClient.close();
    }
}


export async function createLeaderboardEntry(collection, record) {
    await collection.insertOne(record);
    console.log("collection successfully updated");
    console.log(`record added:  ${record.username} : ${record.score}`);

}

export async function findRecordsByUsername(collection, username) {
    return collection.find({username}).toArray();


}

export async function findRankings(collection, start, end) {
    let c = await collection.find().toArray();
    c = c.sort((a,b) => b.score - a.score).slice(start,end)

    let response = [];
    for (let i = 0; i < c.length; i++) {
        response.push([c[i].username, c[i].score])
    }
    console.log(response)
    return(response)
}





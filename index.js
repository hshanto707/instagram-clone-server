const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
const fileUpload = require('express-fileupload')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swoyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("instagram-clone");
    const postCollection = database.collection("post");
    const commentCollection = database.collection("comments");

    // GET ALL POSTS

    app.get("/posts", async (req, res) => {
      const cursor = postCollection.find({});
      const post = await cursor.toArray();
      res.send(post);
    });

    // ADD POST

    app.post("/posts", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.json(result);
    });

    // ADD COMMENT

    app.post("/comments", async (req, res) => {
      const car = req.body;
      const result = await commentCollection.insertOne(car);
      res.json(result);
    });
  } 
  finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Instagram-Clone Server Is Running...");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

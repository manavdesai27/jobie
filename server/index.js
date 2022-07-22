const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, Db } = require("mongodb");

dotenv.config();

const app = express();
let port = process.env.PORT || 8000;
const uri = process.env.ATLAS_URI;
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let timeout = 0;

const streamURL = new URL(
  "https://api.twitter.com/2/tweets/search/stream?tweet.fields=created_at&expansions=author_id&user.fields=created_at"
);

const sleep = async (delay) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};

const streamTweets = () => {
  const config = {
    url: streamURL,
    auth: {
      bearer: BEARER_TOKEN,
    },
    timeout: 31000,
  };

  try {
    const stream = request.get(config);

    stream
      .on("data", (data) => {
        try {
          const json = JSON.parse(data);
          if (json.connection_issue) {
            reconnect(stream);
          } else {
            if (json.data) {
              client.connect(async (err) => {
                if (err) {
                  console.log(err);
                  throw err;
                }

                if (json.includes.users.length === 1) {
                  const db = client.db("Jobie");
                  const col = db.collection("tweets");
                  const dataFormatted = json.data.text;
                  const dateCreated = json.data.created_at;
                  const toAdd = {
                    text: dataFormatted,
                    date: dateCreated,
                    mail: false,
                  };
                  await col.insertOne(toAdd);
                  console.log("tweet added");
                  client.close();
                }
              });
            } else {
              console.log(json);
            }
          }
        } catch (e) {
          //console.log(e);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reconnect(stream);
      });
  } catch (e) {
    console.log(e);
  }
};

async function reconnect(stream) {
  timeout++;
  stream.abort();
  await sleep(2 ** timeout * 1000);
  streamTweets();
}

server.listen(port, () => {
  console.log("Listening in port " + port);
  try {
    streamTweets();
  } catch (e) {
    console.log(e);
  }
});

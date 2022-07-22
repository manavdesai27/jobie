const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let res = [];

const fetcher = async () => {
  client.connect(uri,async (err)=>{
    if(err) throw err;
    const db = client.db("Jobie");
    const col = db.collection("tweets");

    const arrayOfEntries = await col.find({}).toArray();
    arrayOfEntries.map((entry) => res.push(entry));
  })
}

export const dataCall = async () => {
  await fetcher();
  console.log(res);
  return res;
};

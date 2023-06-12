const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri.js");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "PrayingMantis";
const collectionName = "IdentityTruths";
const collection = client.db(dbname).collection(collectionName);
const documentsToFindOnAccepted = { theme: "I Am Accepted" };
const documentsToFindOnSecure = { theme: "I Am Secure" };
const documentsToFindOnSignificant = { theme: "I Am Significant" };

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

const main = async () => {
  try {
    await connectToDatabase();
    let resultOne = collection.find(documentsToFindOnAccepted);
    await resultOne.forEach((doc) => console.log(doc));
    let resultTwo = collection.find(documentsToFindOnSecure);
    let resultThree = collection.find(documentsToFindOnSignificant);
    console.log(resultThree);
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};

main();

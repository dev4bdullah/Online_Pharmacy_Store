// lib/db.ts
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {}; // no dbName here

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

function makeClient() {
  client = new MongoClient(uri, options);
  return client.connect().then((cli) => {
    console.log("✅ MongoDB connected to", cli.db().databaseName);
    return cli;
  });
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = makeClient();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = makeClient();
}



// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in environment variables");
}

let isConnected = false;

 async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB connected using Mongoose");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

export {clientPromise,connectDB}
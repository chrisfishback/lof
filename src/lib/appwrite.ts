import { Client, Databases, Account } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID || '');

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account, PROJECT_ID, DATABASE_ID, COLLECTION_ID };
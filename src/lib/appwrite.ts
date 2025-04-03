import { Client, Databases } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_LOF_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_LOF_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TEAM_COLLECTION_ID;

console.log('Environment variables:', {
    projectId: import.meta.env.VITE_APPWRITE_LOF_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_LOF_DB_ID,
    collectionId: import.meta.env.VITE_APPWRITE_TEAM_COLLECTION_ID
  });

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID || '');

const databases = new Databases(client);

export { client, databases, PROJECT_ID, DATABASE_ID, COLLECTION_ID };
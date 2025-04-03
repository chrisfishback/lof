export const config = {
    appwrite: {
      projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID
    }
  };
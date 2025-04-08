/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APPWRITE_PROJECT_ID: string
    VITE_APPWRITE_DATABASE_ID: string
    VITE_APPWRITE_COLLECTION_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
  }
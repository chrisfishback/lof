/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APPWRITE_LOF_PROJECT_ID: string
    VITE_APPWRITE_LOF_DB_ID: string
    VITE_APPWRITE_TEAM_COLLECTION_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
  }
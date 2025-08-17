import { BlobServiceClient } from "@azure/storage-blob";

export type BlobServiceClientFactory = (accountName: string) => BlobServiceClient;
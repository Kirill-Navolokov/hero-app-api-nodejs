import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from 'uuid';
import { BlobServiceClientFactory } from "../helpers/blobServiceClientFactory";
import path from "path";

@injectable()
export default class BlobService {
    private readonly blobServiceClient: BlobServiceClient;

    constructor(
        @inject(TYPES.BlobServiceClientFactory) blobServiceClientFactory: BlobServiceClientFactory
    ) {
        this.blobServiceClient = blobServiceClientFactory("default");
    }

    public async delete(blobName: string, containerName: string): Promise<void> {
        const blobContainer = this.blobServiceClient.getContainerClient(containerName);
        let blob = blobContainer.getBlockBlobClient(blobName);
        await blob.deleteIfExists({
            deleteSnapshots: "include"
        });
    }

    public async update(
        blobName: string,
        containerName: string,
        file: Express.Multer.File
    ): Promise<[name:string, url: string]> {
        return this.uploadFile(blobName, containerName, file);
    }

    public async upload(file: Express.Multer.File, containerName: string): Promise<[name:string, url: string]> {
        const fileExtension = path.extname(file.originalname);
        const blobName = uuidv4() + fileExtension;

        return this.uploadFile(blobName, containerName, file);
    }

    private async uploadFile(
        blobName: string,
        containerName: string,
        file: Express.Multer.File
    ): Promise<[name:string, url: string]> {
        const fileExtension = path.extname(file.originalname);
        const blobsContainer = this.blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = blobsContainer.getBlockBlobClient(blobName);

        await blockBlobClient.uploadData(file.buffer, {
            metadata: {
                "fileName": file.originalname,
                "fileExtension": fileExtension
            },
            blobHTTPHeaders: {
                blobContentType: file.mimetype
            }
        });

        return [blobName, blockBlobClient.url];
    }
}
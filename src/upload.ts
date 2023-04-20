import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";
import axios from "axios";

require('dotenv').config()

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
}

const s3client = new S3Client({
  region: 'ap-northeast-1',
  credentials: credentials,
})

export const uploadFromUrlToS3 = async (url: string, key: string,): Promise<void> => {
  try {
    console.log("Downloading file...");
    const fileStream = await downloadFile(url);

    // see https://www.npmjs.com/package/@aws-sdk/lib-storage
    const upload = new Upload({
      client: s3client,
      params: {
        Bucket: `${process.env.AWS_S3_BUCKET}`, // whatever your bucket is in S3
        Key: key, // file name
        Body: fileStream, // Body is stream which enables streaming
      },
    });

    // アクセスコントロールの制御が必要かも

    console.log("Uploading to S3...");
    await upload.done();

    console.log("Upload successful!");
  } catch (e) {
    console.log(e);
  }
};

const downloadFile = async (url: string): Promise<Readable> => {
  const response = await axios.get(url, { responseType: "stream" });
  return response.data;
};


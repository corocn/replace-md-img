import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "node:stream";
import axios from "axios";

export const uploadFromUrlToS3 = async (
  s3client: S3Client,
  url: string,
  key: string,
): Promise<void> => {
  try {
    console.log("Downloading file...");
    const response = await axios.get(url, { responseType: "stream" });
    const fileStream: Readable = response.data;

    const upload = new Upload({
      client: s3client,
      params: {
        Bucket: `${process.env.AWS_S3_BUCKET}`,
        Key: key,
        Body: fileStream,
        ContentType: "image/jpg",
      },
    });

    console.log("Uploading to S3...");
    await upload.done();

    console.log("Upload successful!");
  } catch (e) {
    console.error(e);
  }
};

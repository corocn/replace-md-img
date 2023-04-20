import * as AWS from 'aws-sdk';
import * as fs from 'fs';

export const convert = (markdownText: string) => {
    console.log("Hello World!")
}

// Configure AWS SDK with your access and secret keys
AWS.config.update({
    accessKeyId: 'your_access_key',
    secretAccessKey: 'your_secret_key',
    region: 'your_region',
});

const s3 = new AWS.S3();

// markdownのテキストからimg URLを抽出し配列にいれて返す
const extractImgUrls = (markdownText: string) => {
    const imgUrls = []
    const lines = markdownText.split("\n")
    for (const line of lines) {
        if (line.startsWith("![") && line.endsWith(")")) {
            const url = line.split("](")[1].slice(0, -1)
            imgUrls.push(url)
        }
    }
    return imgUrls
}

const uploadFileToS3 = async (bucket: string, key: string, filePath: string): Promise<void> => {
    try {
        // Read the file from the file system
        const fileContent = fs.readFileSync(filePath);

        // Prepare S3 upload parameters
        const params: AWS.S3.PutObjectRequest = {
            Bucket: bucket,
            Key: key,
            Body: fileContent,
        };

        // Upload the file to S3
        const result = await s3.putObject(params).promise();
        console.log(`File uploaded successfully to S3. ETag: ${result.ETag}`);
    } catch (error: any) {
        console.error(`Error while uploading file to S3: ${error.message}`);
    }
}
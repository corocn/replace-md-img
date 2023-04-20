import * as AWS from 'aws-sdk';
import fs = require('fs');

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

// extractImgUrls と extractImgSrcs を使って、URLを抽出する
export const extractImageUrls = (markdownText: string): string[] => {
    const imgUrls = extractMarkdownImageUrls(markdownText)
    const imgSrcs = extractHTMLImageTagUrls(markdownText)

    // imgUrls と imgSrcs をマージ
    for (const imgSrc of imgSrcs) { imgUrls.push(imgSrc) }

    // imgUrls から重複を削除
    const uniqueImgUrls = Array.from(new Set(imgUrls))

    // 拡張子をjpg/JPEG/jpeg/png/PNGに絞る
    const filteredImgUrls = uniqueImgUrls.filter((url) => {
        const ext = url.split(".").pop()
        return ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "JPG" || ext === "JPEG" || ext === "PNG"
    })

    return filteredImgUrls;
}


// markdown からimg URLを抽出し配列にいれて返す
const extractMarkdownImageUrls = (markdownText: string): string[] => {
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

// HTMLのimgタグからsrcを抽出し配列にいれて返す
const extractHTMLImageTagUrls = (htmlText: string): string[] => {
    const imgSrcs = []

    const lines = htmlText.split("\n")
    for (const line of lines) {
        if (line.startsWith("<img") && line.endsWith(">")) {
            const src = line.split("src=\"")[1].split("\"")[0]
            imgSrcs.push(src)
        }
    }
    return imgSrcs
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
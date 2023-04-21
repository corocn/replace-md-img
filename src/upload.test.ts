import { test } from 'vitest'
import { uploadFromUrlToS3 } from "./upload";
import { S3Client } from "@aws-sdk/client-s3";

test.skip('uploadFromUrlToS3', async () => {
  require('dotenv').config()

  // s3clientを作成
  const s3client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  })

  // new Date を用いて、YYYY-MM-DDTHH:mm:ss のファイル名を生成
  const uploadedFilename = new Date().toISOString().replace(/:/g, '-')

  // アップロード実行
  await uploadFromUrlToS3(
    s3client,
    'https://pbs.twimg.com/profile_images/1612971754489778177/ZsuW-mWs_400x400.jpg',
    `test/${uploadedFilename}.jpg`
  )
})

import { expect, test } from 'vitest'
import { uploadFromUrlToS3 } from "./upload";

// ローカルでのみテストできるように通常はskipするよ
test('uploadFromUrlToS3', async () => {
  await uploadFromUrlToS3(
    'https://pbs.twimg.com/profile_images/1612971754489778177/ZsuW-mWs_400x400.jpg',
    'test.jpg'
  )
})

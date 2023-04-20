import { expect, test } from 'vitest'
import { extractImageUrls } from "./index";

const sampleMarkdown = `
# Hello World!
![Sample](https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge1.jpg)
![Sample](https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge1.png)

<img src="https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge2.jpg">
<img src="https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge2.png">
`

test('extractImageUrls', () => {
  const markdownText = sampleMarkdown;
  const result = extractImageUrls(markdownText)

  expect(result).toEqual([
    'https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge1.jpg',
    'https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge1.png',
    'https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge2.jpg',
    'https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge2.png',
  ])
})

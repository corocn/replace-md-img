import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { extractImageUrls } from "./index.ts";


Deno.test("extractImageUrls", () => {
    const markdownText = `
# Hello World!
<img src="https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge.jpg">
<img src="https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge.jpeg">
<img src="https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge.JPEG">
<img src="https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge.png">
<img src="https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge.PNG">

![Sample](https://hogehoge.s3-ap-northeast-1.amazonaws.com/hoge.png)
`
    // const expected = [
    //   'https://hogehoge.s3-ap-northeast-1.amazonaws.com/.jpg',
    //   'https://hogehoge.s3-ap-northeast-1.amazonaws.com/.png'
    // ]

  console.debug(extractImageUrls(markdownText))
});

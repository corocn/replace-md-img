export const convert = (markdownText: string) => {
    console.log("Hello World!")
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

// extractImgUrls と extractImgSrcs を使って、URLを抽出する
export const extractImageUrls = (markdownText: string): string[] => {
    const imgUrls = extractMarkdownImageUrls(markdownText)
    const imgSrcs = extractHTMLImageTagUrls(markdownText)

    // imgUrls と imgSrcs をマージ
    for (const imgSrc of imgSrcs) { imgUrls.push(imgSrc) }

    // imgUrls から重複を削除
    const uniqueImgUrls = Array.from(new Set(imgUrls))
    return uniqueImgUrls;
}

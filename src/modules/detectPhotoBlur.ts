import { imread, CV_64F } from '@u4/opencv4nodejs'

export function detectPhotoBlur(path: string): number {
  console.log(`Detecting blur`)
  try {
    const image = imread(path)
    const gray = image.bgrToGray()
    const score = gray.laplacian(CV_64F).mean().w
    image.release()
    gray.release()

    console.log(`Blur score ${score}`)
    return score
  } catch (error: any) {
    console.log("Could not detect blur", error)
    return 0
  }
}
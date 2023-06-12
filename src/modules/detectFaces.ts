import { CascadeClassifier, HAAR_FRONTALFACE_ALT2, imread, Mat } from "@u4/opencv4nodejs";
import { FaceInfo } from "../interfaces/FaceInfo";

export function detectFaces(photoPath: string): FaceInfo[] {
  console.log(`Detecting faces`);
  try {
    const classifier = new CascadeClassifier(HAAR_FRONTALFACE_ALT2)
    const image = imread(photoPath)

    const faceRects = classifier.detectMultiScale(image.bgrToGray()).objects
    const faces = faceRects.map((rect) => ({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      mat: image.getRegion(rect),
    }))

    image.release()

    console.log(`Found ${faces.length} faces`)
    return faces
  } catch (error: any) {
    throw error
  }
}
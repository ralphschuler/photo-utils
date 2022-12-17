import { ORBDetector, imread, Mat } from "@u4/opencv4nodejs"

export function extractFeatures(
  path: string
): {
  keypoints: any[]
  descriptors: Mat
} {
  console.log(`Detecting features`)
  try {
    const detector = new ORBDetector()
  const img = imread(path)

  const keypoints = detector.detect(img)
  const descriptors = detector.compute(img, keypoints)

  console.log(`Found ${keypoints.length} keypoints`)

  return {
    keypoints,
    descriptors,
  };
  } catch (error: any) {
    console.log("Could not extract features", error)
    return {
      keypoints: [],
      descriptors: new Mat(),
    }
  }
}
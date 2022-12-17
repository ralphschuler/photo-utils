import { imread } from '@u4/opencv4nodejs';

export function comparePhotos(
  photo1: string,
  photo2: string
): number {
  console.log(`Comparing ${photo1} and ${photo2}`);
  try {
    const img1 = imread(photo1);
    const img2 = imread(photo2);
    const diff = img1.absdiff(img2);
    const score = diff.mean().w;
    return score;
  } catch (error: any) {
    console.log("Could not compare photos", error);
    return 0;
  }
}
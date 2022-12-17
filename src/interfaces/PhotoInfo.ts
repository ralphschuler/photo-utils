import { Mat } from "@u4/opencv4nodejs"
import { FaceInfo } from "./FaceInfo"

export interface PhotoInfo {
  id: string
  path: string
  name: string
  hash: string

  blurScore: number
  faces: FaceInfo[]
  labels: string[]
  features: {
    keypoints: any[]
    descriptors: Mat
  }
}
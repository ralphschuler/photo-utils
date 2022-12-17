import { Mat } from "@u4/opencv4nodejs"

export interface FaceInfo {
  x: number
  y: number
  width: number
  height: number
  mat: Mat
  label?: string
}
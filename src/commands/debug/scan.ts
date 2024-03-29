import { detectPhotoBlur } from "../../modules/detectPhotoBlur"
import { scanDirectory } from "../../modules/scanDirectory"
import { Command } from "@oclif/core";
import { extname, basename, join } from "path"
import { PhotoInfo } from "../../interfaces/PhotoInfo"
import { FaceInfo } from "../../interfaces/FaceInfo"
import { GenericStore } from "../../modules/genericStore"
import { calculatePhotoHash } from "../../modules/calculatePhotoHash"
import { detectFaces } from "../../modules/detectFaces";
import { comparePhotos } from "../../modules/comparePhotos";
import { extractFeatures } from "../../modules/extractFeatures";

export default class Scan extends Command {
  static description = 'Scan a directory for photos'

  static examples = [
    `$ photo-utils debug scan ~/Pictures`,
  ]

  static args = [
    {
      name: 'path',
      required: true,
      description: 'path to scan',
    },
  ]

  async run(): Promise<void> {
    const unreadableFiles = new GenericStore<string>(join(this.config.cacheDir, "unreadableFiles.json"))
    const photoInfos = new GenericStore<PhotoInfo>(join(this.config.cacheDir, "photoInfos.json"))

    const { args } = await this.parse(Scan)

    const path = args.path
    const files = scanDirectory(path)
    let index = 1
    for await (const file of files) {
      const startTimestamp = Date.now()
      const id = Buffer.from(file).toString("base64")
      if (!isPhoto(file) ) {
        continue
      }

      if (photoInfos.has(id)|| unreadableFiles.has(id)) {
        console.log(`[${index++}] Skipping ${file}`)
        continue
      }

      console.log(`[${index++}] Scanning ${file}`)
      try {
        const blurScore = detectPhotoBlur(file)
        const hash = calculatePhotoHash(file)
        const faces: FaceInfo[] = detectFaces(file)
        const features = extractFeatures(file)
        photoInfos.set(id, {
          id,
          name: basename(file),
          path: file,
          blurScore,
          hash,
          faces,
          labels: [],
          features
        })
      } catch (error: any) {
        console.log(`Error: ${error}`)
        unreadableFiles.set(id, file)
        continue
      } finally {
        const endTimestamp = Date.now()
        console.log(`Scanned in ${endTimestamp - startTimestamp}ms`)
      }

      console.log("")
    }
  }
}

function isPhoto(file: string): boolean {
  const extensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"]
  return extensions.includes(extname(file).toLowerCase())
}
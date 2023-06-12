import { readFileSync } from 'fs'
import { createHash } from 'crypto'

export function calculatePhotoHash(path: string): string {
  console.log(`Calculating hash`)
  try {
    const rawImage = readFileSync(path)

    const hash = createHash('sha256').update(rawImage).digest('hex')

    return hash
  } catch (error: any) {
    throw error
  }
}
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export async function* scanDirectory(directory: string): AsyncGenerator<string> {
  try {
    console.log(`Scanning ${directory}`)
    const files = await readdir(directory)
    for (const file of files) {
      const fullPath = join(directory, file)
      const stats = await stat(fullPath)
      if (stats.isDirectory()) {
        yield* scanDirectory(fullPath)
      }
      if (stats.isFile() && stats.size > 0) {
        yield fullPath
      }
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
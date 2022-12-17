import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export async function scanDirectory(directory: string): Promise<string[]> {
  try {
    const scan = async (dir: string): Promise<string[]> => {
      console.log(`Scanning ${dir}`)
      const files = await readdir(dir)
      const fileList: string[] = []
  
      for (const file of files) {
        const fullPath = join(dir, file)
        const stats = await stat(fullPath)
        if (stats.isDirectory()) {
          const subDirFiles = await scan(fullPath)
          fileList.push(...subDirFiles)
        }
  
        if (stats.isFile()) {
          fileList.push(fullPath)
        }
      }
      console.log(`Found ${fileList.length} files in ${dir}`)
      return fileList
    }
    return await scan(directory)
  } catch (error: any) {
    console.log(error.message)
    return []
  }
}

// create a recursive scan directory function which will use yield to return the files
export async function* scanDirectory2(directory: string): AsyncGenerator<string> {
  try {
    console.log(`Scanning ${directory}`)
    const files = await readdir(directory)
    for (const file of files) {
      const fullPath = join(directory, file)
      const stats = await stat(fullPath)
      if (stats.isDirectory()) {
        yield* scanDirectory2(fullPath)
      }
      if (stats.isFile()) {
        yield fullPath
      }
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
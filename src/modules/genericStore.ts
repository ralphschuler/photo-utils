import { readFileSync, writeFileSync } from 'fs'
import { stat } from 'fs/promises';

export class GenericStore<T> {
  private storePath: string;
  private storeData: { [key: string]: T };

  public constructor(storePath: string) {
    this.storePath = storePath
    this.storeData = {}

    this.load()
  }

  public async load() {
    const fileExists = await stat(this.storePath).catch(() => false)
    if (!fileExists) {
      return
    }
    const rawData = readFileSync(this.storePath, 'utf8')
    const data = JSON.parse(rawData)

    this.storeData = data
  }

  public save() {
    const rawData = JSON.stringify(this.storeData, null, 2)

    writeFileSync(this.storePath, rawData)
  }

  public set(key: string, value: T) {
    this.storeData[key] = value

    this.save()
  }

  public get(key: string): T {
    return this.storeData[key]
  }

  public delete(key: string) {
    delete this.storeData[key]

    this.save()
  }

  public has(key: string) {
    return this.storeData[key] !== undefined
  }

}
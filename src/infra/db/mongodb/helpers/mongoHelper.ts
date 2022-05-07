import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  getColection (name: string): Collection {
    return this.client.db().collection(name)
  }
}

export const map = <T> (collection: any): T => {
  const { _id, ...accountWithoutId } = collection
  return Object.assign({}, accountWithoutId, { id: _id.toHexString() }) as T
}

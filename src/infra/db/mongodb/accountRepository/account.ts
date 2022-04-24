import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AddAccountModel } from '../../../../domain/usecases/addAccount/addAccount'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper, map } from '../helpers/mongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getColection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { insertedId: id } = result
    const accountById = await accountCollection.findOne({ _id: id })
    return await map(accountById)
  }
}

import { AddAccount, AddAccountModel } from '../../../domain/usecases/addAccount/addAccount'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AddAccountModel> {
    await this.encrypter.encrypt(account.password)
    return account
  }
}

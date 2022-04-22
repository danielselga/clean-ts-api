import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './dbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hasehdPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign(accountData, { password: hasehdPassword }))
    return await new Promise(resolve => resolve(null))
  }
}

import { AddAccountModel } from '../../domain/usecases/addAccount/addAccount'
import { AccountModel } from '../usecases/AddAccount/dbAddAccountProtocols'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}

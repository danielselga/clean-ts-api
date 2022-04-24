import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../cryptography/bcryptAdapter'

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

// Jest mock
jest.mock('bcrypt', () => ({
  async hash (): Promise<String> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

describe('Bycript Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})

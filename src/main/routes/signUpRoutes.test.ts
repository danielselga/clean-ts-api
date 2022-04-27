import request from 'supertest'
import app from '../config/app'

describe('signUp routes', () => {
  test('Should return an account on success', async () => {
    await request(app).post('/api/signup').send({ name: 'Daniel', email: 'danielselga@gmail.com', password: '123', passwordConfirmation: '123' }).expect(200)
  })
})

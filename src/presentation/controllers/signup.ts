import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/httpHelper'
import { Controller, EmailValidator, HttpResponse, HttpRequest } from '../protocols'

// Implements a class means we can tye the class as the interface.
// This is a very good practice.
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return badRequest(new Error('Passed'))
    } catch (error) {
      return serverError()
    }
  }
}

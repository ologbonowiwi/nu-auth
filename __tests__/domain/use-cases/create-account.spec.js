import { faker } from '@faker-js/faker'
import { createAccount } from "../../../src/domain/use-cases/create-account";
import { mergeWithViolations } from '../../../src/helpers/mergeWithViolations';
import { accountRepository } from "../../stubs/accountRepository"

describe(`[${createAccount.name}]`, () => {
  let account
  let repository
  let accountProcessor = createAccount(repository)

  beforeEach(() => {
    account = faker.datatype.json()
    repository = accountRepository()
    accountProcessor = createAccount(repository)
  })

  it('should be a method', () => {
    expect(createAccount).toBeInstanceOf(Function)
  })

  it('should create an account successfully and save on repository if repository is empty', () => {
    repository.isEmpty.mockReturnValue(true)

    accountProcessor(account)

    expect(repository.save).toHaveBeenCalled()
  })

  it('should return violation "account-already-initialized" if repository is not empty', () => {
    repository.isEmpty.mockReturnValue(false)

    const response = accountProcessor(account)

    expect(repository.save).not.toHaveBeenCalled()
    expect(response).toEqual(expect.objectContaining(mergeWithViolations({}, 'account-already-initialized')))
  })
})
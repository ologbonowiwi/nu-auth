import { faker } from '@faker-js/faker';
import { AccountRepository } from '../../src/repositories/accountRepository'

describe(`[${AccountRepository.name}]`, () => {
  let account
  let repository = new AccountRepository()

  beforeEach(() => {
    account = faker.datatype.json()
    repository = new AccountRepository()
  })

  it('should be a valid class', () => {
    expect(AccountRepository).toBeDefined()
    expect(AccountRepository).toBeInstanceOf(Function)
  });

  it('should be empty if no account is saved', () => {
    expect(repository.isEmpty()).toBe(true)
  })

  it('should fill and access account successfully', () => {
    repository.save(account)

    expect(repository.account).toStrictEqual(account)
  })

  it('should return not empty after save', () => {
    repository.save(account)

    expect(repository.isEmpty()).toBe(false)
  })

  it('should save old versions on history list', () => {
    const history = []

    repository.save(account)
    history.push(account)

    account = faker.datatype.json()
    repository.save(account)
    
    expect(repository.history).toStrictEqual(history)
  })
});

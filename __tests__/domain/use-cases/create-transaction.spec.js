import { faker } from "@faker-js/faker"
import { createTransaction } from "../../../src/domain/use-cases/create-transaction";
import { mergeWithViolations } from "../../../src/helpers/mergeWithViolations";
import { AccountRepository } from "../../../src/repositories/accountRepository";

describe(`[${createTransaction.name}]`, () => {
  let accRepository = new AccountRepository()
  let transactionProcessor = createTransaction({})
  let transaction
  let account

  beforeEach(() => {
    accRepository = new AccountRepository()
    account = { ['active-card']: true, ['available-limit']: 10000 }
    transactionProcessor = createTransaction({ accountRepository: accRepository })
    transaction = {
      amount: faker.commerce.price(),
      merchant: faker.company.companyName(),
      time: faker.date.soon()
    }
  })

  it('should be a method', () => {
    expect(createTransaction).toBeInstanceOf(Function)
  })

  it('should return "account-not-initialized" if account repository is empty', () => {
    expect(transactionProcessor(transaction)).toEqual(expect.objectContaining(mergeWithViolations({}, 'account-not-initialized')))
  })

  it('should return violation "card-not-active" if card-active property from account is false', () => {
    account['active-card'] = false
    accRepository.save(account)

    expect(transactionProcessor(transaction)).toEqual(expect.objectContaining(mergeWithViolations({}, 'card-not-active')))
  })

  it('should return violation "insufficient-limit" if transaction amount is greater than available-limit', () => {
    accRepository.save({ ...account, ['available-limit']: 0 })

    expect(transactionProcessor(transaction)).toEqual(expect.objectContaining(mergeWithViolations({}, 'insufficient-limit')))
  })

  it('should execute transaction successfully', () => {
    accRepository.save(account)
    const limit = accRepository.account["available-limit"]

    expect(transactionProcessor(transaction)).toEqual(mergeWithViolations({ account: { ...accRepository.account, ['available-limit']: limit - transaction.amount } }))
  })
})
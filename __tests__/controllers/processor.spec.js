import { jest } from '@jest/globals'
import { processor } from '../../src/controllers/processor'

describe(`[${processor.name}]`, () => {
  let accountProcessor
  let transactionProcessor

  beforeEach(() => {
    accountProcessor = jest.fn()
    transactionProcessor = jest.fn()
  })

  it('should be a method', () => {
    expect(processor).toBeDefined()
  });

  it('should call account processor because object have an "account" key', () => {
    const input = { account: {} }

    processor({ transactionProcessor, accountProcessor })(input)

    expect(accountProcessor).toHaveBeenCalledWith(input.account)
  });

  it('should call transaction processor because object have an "transaction" key', () => {
    const input = { transaction: {} }

    processor({ transactionProcessor, accountProcessor })(input)

    expect(transactionProcessor).toHaveBeenCalledWith(input.transaction)
  });
});

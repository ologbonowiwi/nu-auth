import { mergeWithViolations } from "../../helpers/mergeWithViolations.js"

export const createTransaction = ({ accountRepository, transactionRepository }) => {
  return (transaction) => {
    const violations = []

    if (accountRepository.isEmpty()) {
      return mergeWithViolations({ account: {} }, 'account-not-initialized')
    }

    if (accountRepository.account['active-card'] === false) {
      violations.push('card-not-active')
    }

    if (accountRepository.account['available-limit'] < transaction.amount) {
      violations.push('insufficient-limit')
    }

    if (!violations.length) {
      const oldLimit = accountRepository.account['available-limit']

      const newLimit = oldLimit - transaction.amount

      accountRepository.save({ ...accountRepository.account, ['available-limit']: newLimit })

      return mergeWithViolations({ account: accountRepository.account }, ...violations)
    }

    return mergeWithViolations({ account: accountRepository.account }, ...violations)
  }
}
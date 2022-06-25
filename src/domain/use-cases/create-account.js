import { mergeWithViolations } from '../../helpers/mergeWithViolations.js'

export const createAccount = (repository) => {
  return (account) => {
    if (!repository.isEmpty()) {
      return mergeWithViolations({ account }, 'account-already-initialized')
    }

    repository.save(account)

    return mergeWithViolations({ account })
  }
}
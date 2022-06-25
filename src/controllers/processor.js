export const processor = ({ accountProcessor, transactionProcessor }) => {
  return (line) => {
    if (Object.keys(line).includes('account')) {
      return accountProcessor(line.account)
    }

    if (Object.keys(line).includes('transaction')) {
      return transactionProcessor(line.transaction)
    }
  }
}
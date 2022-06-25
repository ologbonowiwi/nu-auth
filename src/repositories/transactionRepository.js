export class TransactionRepository {
  #transactions = []

  add(transaction) {
    this.#transactions.push(transaction)
  }

  get transaction() {
    return this.#transactions
  }
}
export class AccountRepository {
  #account = null
  #history = []

  save(account) {
    if (this.#account !== null) this.#history.push(this.#account)

    this.#account = account
  }

  isEmpty() {
    return this.#account === null
  }

  get account() {
    return this.#account
  }

  get history() {
    return this.#history
  }
}

import { processor } from "./controllers/processor.js";
import { createAccount } from "./domain/use-cases/create-account.js";
import { createTransaction } from "./domain/use-cases/create-transaction.js";
import { readFile } from "./helpers/readFile.js";
import { AccountRepository } from "./repositories/accountRepository.js"
import { TransactionRepository } from "./repositories/transactionRepository.js";

const accountRepository = new AccountRepository()
const transactionRepository = new TransactionRepository()
const accountProcessor = createAccount(accountRepository)
const transactionProcessor = createTransaction({ accountRepository, transactionRepository })
const processorInstance = processor({ accountProcessor, transactionProcessor })

readFile(processorInstance)

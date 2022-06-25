import { jest } from '@jest/globals'

export const accountRepository = () => ({ save: jest.fn(), isEmpty: jest.fn(), account: { ['active-card']: true, ['available-limit']: 10000 } })
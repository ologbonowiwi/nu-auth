# Nu-Auth

Oi! Existem dois processos nesse projeto, você pode:

## Executar o teste automatizado

- `npm install` (para instalar a biblioteca de testes)
- `npm run test`
- `npm run test:coverage` (se você quiser dar uma olhada no coverage que a aplicação atingiu. modéstia parte, cheguei num número bem legal 😁)

## Executar a aplicação, com os inputs que eu criei ou criando novos inputs.

Existem alguns inputs pré configurados por mim, você pode checar todos eles na pasta /features do projeto.
O comando para executar a aplicação é bem simples, apenas um comando:

- `npm start < caminho-do-input`

Aqui estão pré setados todos os casos que implementei, e você pode executar os inputs que criei pra eles:

- `npm start < features/create-account ## Criação de conta`
- `npm start < features/account-already-initialized ## Conta já criada`
- `npm start < features/account-not-initialized ## Conta ainda não criada`
- `npm start < features/create-transaction ## Cria uma conta e duas transações com sucesso`
- `npm start < features/insufficient-limit ## Limite insuficiente`

Sinta-se a vontade para colocar novos inputs no projeto conforme queira.

## Casos não implementados

Existem dois casos que não consegui implementar a tempo (ops), mas a ideia por trás da minha aplicação foi: qualidade > quantidade. Foquei em cobrir muito bem os casos implementados com testes, e em escrever o código deles da melhor forma possível.
Os casos não implementados são:
- `doubled-transaction`
- `high-frequency-transaction`
Então se você rodar esses casos, o código vai processar eles normalmente.
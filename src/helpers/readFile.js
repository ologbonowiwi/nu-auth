import { createInterface } from 'readline';

export const readFile = (callback) => {
  const terminalInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  terminalInterface.on('line', line => {
    const operation = JSON.parse(line)
  
    console.log(callback(operation));
  });
};

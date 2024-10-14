import { parseArgs } from 'node:util';
import { homedir } from 'os';
import { createInterface } from 'readline/promises';
import { handleCommand } from './src/cli.js';
import { chdir } from 'process';

const { values } = parseArgs({
  options: {
    username: { type: 'string' }
  }
});

const username = values.username || 'Username';
const homeDir = homedir();

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${homeDir}`);

chdir(homeDir);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

while (true) {
  const input = await rl.question('> ');
  if (input.trim() === '.exit') {
    process.exit(0);
  }
  await handleCommand(input);
  console.log(`You are currently in ${process.cwd()}`);
}
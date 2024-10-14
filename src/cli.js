import { up, cd, ls } from './navigation.js';
import { cat, add, rn, cp, mv, rm } from './fileOperations.js';

export async function handleCommand(input) {
  const [command, ...args] = input.trim().split(' ');

  try {
    switch (command) {
      case 'up':
        await up();
        break;
      case 'cd':
        await cd(args[0]);
        break;
      case 'ls':
        await ls();
        break;
      case 'cat':
        await cat(args[0]);
        break;
      case 'add':
        await add(args[0]);
        break;
      case 'rn':
        await rn(args[0], args[1]);
        break;
      case 'cp':
        await cp(args[0], args[1]);
        break;
      case 'mv': 
        await mv(args[0], args[1]);
        break;
      case 'rm': 
        await rm(args[0]);
        break;
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.log('Operation failed');
  }
}

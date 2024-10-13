import { up, cd, ls } from './navigation.js';
// import { cat, add, run, cp, mv, rm } from './fileOperations.js';
// import { getOsInfo } from './osInfo.js';
// import { calculateHash } from './hash.js';
// import { compress, decompress } from './compression.js';

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
      // case 'cat':
      //   await cat(args[0]);
      //   break;
      // case 'add':
      //   await add(args[0]);
      //   break;
      // case 'run':
      //   await run(args[0]);
      //   break;
      // case 'cp':
      //   await cp(args[0], args[1]);
      //   break;
      // case 'mv':
      //   await mv(args[0], args[1]);
      //   break;
      // case 'rm':
      //   await rm(args[0]);
      //   break;
      // case 'os':
      //   await getOsInfo();
      //   break;
      // case 'hash':
      //   await calculateHash(args[0]);
      //   break;
      // case 'compress':
      //   await compress(args[0]);
      //   break;
      // case 'decompress':
      //   await decompress(args[0]);
      //   break;
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.log('Operation failed');
  }
}

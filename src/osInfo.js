import os from 'os';

export function getEOL() {
  const eol = os.EOL;
  console.log('Default system End-Of-Line:');
  console.log(JSON.stringify(eol));
  console.log('EOL character code:', eol.charCodeAt(0));
}

export function getCPUs() {
  const cpus = os.cpus();
  console.log('CPUs information:');
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Speed: ${cpu.speed} MHz`);
    console.log(`  Times: ${JSON.stringify(cpu.times)}`);
  });
}

export function getHomeDir() {
  const homeDir = os.homedir();
  console.log('Home directory:', homeDir);
}

export function getUsername() {
  const username = os.userInfo().username;
  console.log('Username:', username);
}

export function getArchitecture() {
  const architecture = os.arch();
  console.log('System Architecture:', architecture);
}
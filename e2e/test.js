const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const kill = require('util').promisify(require('tree-kill'));

const cypress = require('cypress');

(async () => {
  await start();
  await cypress.run({
    browser: 'chrome',
    config: require(path.join(__dirname, 'cypress.json')),
    spec: 'cypress/integration/*.test.js'
  });

  await killAll();
  process.exit(0);
})();

async function start() {
  // Run the server.
  await runServer(8080);
}

function runServer(port) {
  let resolved = false;
  return new Promise((resolve, reject) => {
    const serverOptions = {
      env: {
        ...process.env,
        NODE_ENV: 'development',
        PORT: port
      }
    };

    const server = spawnProcessUntilSigint(
      'node',
      [path.join(__dirname, '../', 'backend', 'index.js')],
      serverOptions
    );

    server.stdout.on('data', (data) => {
      if (!resolved) {
        console.log(data.toString());
        resolved = true;
        resolve({ port });
      }
    });

    server.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    server.on('close', (code) => {
      if (code) {
        return reject(new Error(`failed to start server ${port} with ${code}`));
      }
      resolve({ port });
    });
  });
}

process.on('SIGINT', () => {
  process.exit();
});

async function killAll() {
  // Best effort to kill all the processes.
  let pids;
  try {
    pidsFile = path.join(__dirname, '.pids');
    pids = fs.readFileSync(pidsFile);
  } catch (_) {}

  if (!pids) {
    return;
  }

  for (const pid of pids
    .toString()
    .split('\n')
    .filter((pid) => pid !== '')) {
    try {
      await kill(pid);
    } catch (_) {}
  }

  try {
    fs.unlinkSync(pidsFile);
  } catch (_) {}
}

function spawnProcessUntilSigint(command, args, envVars) {
  const childProcess = spawn(command, args, envVars);
  fs.writeFileSync(path.join(__dirname, '.pids'), `${childProcess.pid}\n`, {
    flag: 'a'
  });

  process.on('SIGINT', async () => {
    await kill(childProcess.pid);
  });

  return childProcess;
}

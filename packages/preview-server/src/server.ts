import { WebSocketServer, WebSocket } from 'ws';
import { spawn, ChildProcess } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 3005;

// Available demo components
const DEMOS: Record<string, string> = {
  button: 'demos/button.tsx',
  card: 'demos/card.tsx',
  alert: 'demos/alert.tsx',
  form: 'demos/form.tsx',
  progress: 'demos/progress.tsx',
  interactive: 'demos/interactive.tsx',
};

const wss = new WebSocketServer({ port: PORT });

console.log(`🖥️  Preview server running on ws://localhost:${PORT}`);
console.log(`📦 Available demos: ${Object.keys(DEMOS).join(', ')}`);

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  let currentProcess: ChildProcess | null = null;

  ws.on('message', (message: Buffer) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'start') {
        // Start a demo
        const demo = data.demo || 'interactive';
        const demoPath = DEMOS[demo];

        if (!demoPath) {
          ws.send(JSON.stringify({ type: 'error', message: `Unknown demo: ${demo}` }));
          return;
        }

        // Kill existing process if any
        if (currentProcess) {
          currentProcess.kill();
        }

        const fullPath = join(__dirname, demoPath);
        console.log(`Starting demo: ${demo} (${fullPath}) cols=${data.cols} rows=${data.rows}`);

        // Spawn tsx to run the demo
        currentProcess = spawn('npx', ['tsx', fullPath], {
          cwd: join(__dirname, '..'),
          env: {
            ...process.env,
            FORCE_COLOR: '1',
            TERM: 'xterm-256color',
            COLUMNS: String(data.cols || 80),
            LINES: String(data.rows || 24),
          },
          stdio: ['pipe', 'pipe', 'pipe'],
        });

        currentProcess.stdout?.on('data', (output: Buffer) => {
          ws.send(JSON.stringify({ type: 'output', data: output.toString() }));
        });

        currentProcess.stderr?.on('data', (output: Buffer) => {
          ws.send(JSON.stringify({ type: 'output', data: output.toString() }));
        });

        currentProcess.on('exit', (exitCode) => {
          ws.send(JSON.stringify({ type: 'exit', code: exitCode }));
          currentProcess = null;
        });

        currentProcess.on('error', (err) => {
          ws.send(JSON.stringify({ type: 'error', message: err.message }));
          currentProcess = null;
        });

        ws.send(JSON.stringify({ type: 'started', demo }));
      } else if (data.type === 'input' && currentProcess) {
        // Send input to process stdin
        currentProcess.stdin?.write(data.data);
      } else if (data.type === 'stop') {
        // Stop current demo
        if (currentProcess) {
          currentProcess.kill();
          currentProcess = null;
        }
      }
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    if (currentProcess) {
      currentProcess.kill();
    }
  });

  // Send available demos
  ws.send(JSON.stringify({ type: 'demos', list: Object.keys(DEMOS) }));
});

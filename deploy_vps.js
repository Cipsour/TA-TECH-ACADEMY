import { Client } from 'ssh2';

const conn = new Client();

console.log('Connecting to VPS 14.225.46.204 via SSH...');

conn.on('ready', () => {
  console.log('>>> SSH Connection Successful!');
  console.log('>>> Running deploy command on VPS...');
  
  const command = 'cd /var/www/tuananhtinhoc-academy && git pull origin main && ./deploy-server.sh';
  
  conn.exec(command, (err, stream) => {
    if (err) {
      console.error('Exec error:', err);
      conn.end();
      return;
    }
    stream.on('close', (code, signal) => {
      console.log('>>> Command completed with exit code:', code);
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data.toString());
    }).stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });
  });
}).on('error', (err) => {
  console.error('>>> SSH Connection Error:', err);
}).connect({
  host: '14.225.46.204',
  port: 22,
  username: 'root',
  password: '1Sonline@2026@',
  readyTimeout: 20000
});

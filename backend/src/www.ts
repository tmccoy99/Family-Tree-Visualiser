import app from './app';
import http, { Server } from 'http';

const port = 8085;
app.set('port', port);

const server: Server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
process.on('SIGHUP', onShutdown);

function onListening(): void {
  const addr = server.address() as any;
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Now listening on ' + bind);
}

async function onShutdown(): Promise<void> {
  console.log('Shutting down server');
  await server.close();
  process.exit(0);
}

import app from './app';
import http, { Server } from 'http';

const port = 8080;
app.set('port', port);

const server: Server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening(): void {
  const addr = server.address() as any;
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Now listening on ' + bind);
}

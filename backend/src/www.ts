import app from './app';
import http, { Server } from 'http';
import mongoose from 'mongoose';

const port = 8085;
app.set('port', port);

const server: Server = http.createServer(app);
const dbURL: string = `mongodb://127.0.0.1:27017/family-tree-${process.env.NODE_ENV}`;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

server.listen(port);
server.on('listening', onListening);
process.on('SIGHUP', onShutdown);

function onListening(): void {
  const addr = server.address() as any;
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Now listening on ' + bind);
}

function onShutdown(): void {
  console.log('Shutting down server');
  server.close();
  process.exit(0);
}

import * as express from 'express';
import * as compression from 'compression';
import * as path from 'path';
import type { Request, Response, NextFunction } from 'express';

class Server {
  private PORT: string;
  private express = express();
  constructor(port: string) {
    this.PORT = port;
    this.middleware();
    this.routes();
    this.listen();
  }

  middleware() {
    this.express.use(this.forceSSL);
    this.express.use(compression());
    this.express.use(express.static(path.resolve(__dirname, '../')));
  }

  routes() {
    this.express.get('/*', (req: Request, res: Response) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  listen() {
    this.express.listen(this.PORT, () => {
      console.log('Server listening on ' + this.PORT);
    });
  }

  forceSSL(req: Request, res: Response, next: NextFunction) {
    if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
      res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
    } else {
      next();
    }
  }
}

const server = new Server(process.env.PORT || '3030');

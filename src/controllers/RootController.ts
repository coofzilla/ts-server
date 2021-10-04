import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('not permitted');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
    <div>
      <div>You are Logged in</div>
      <a href="/auth/logout">Logout</a>
    </div>
    `);
    } else {
      res.send(`
    <div>
      <div>You are Logged Out</div>
      <a href="/auth/login">Login</a>
    </div>
    `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route, you are logged in');
  }
}

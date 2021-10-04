import { Request, Response } from 'express';
import { get, controller, bodyValidator, post } from './decorators';

// import { get } from './decorators/routes';
// import { controller } from './decorators/controller';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email"/>
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password"
      </div>
      <button>Submit</button>
    </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === 'email' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('invalid email or password');
    }
  }
}

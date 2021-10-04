import { Router, Request, Response, NextFunction } from 'express';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('not permitted');
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
      <div>You are Logged in</div>
      <a href="/logout">Logout</a>
    </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are Logged Out</div>
      <a href="/login">Login</a>
    </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, you are logged in');
});

export { router };

// import { Router, Request, Response } from 'express';

// interface RequestWithBody extends Request {
//   body: { [key: string]: string | undefined };
// }

// const router = Router();

// router.get('/login', (req: Request, res: Response) => {
//   res.send(`
//   <form method="POST">
//     <div>
//       <label>Email</label>
//       <input name="emailWrong"/>
//     </div>
//     <div>
//       <label>Password</label>
//       <input name="passwordWrong" type="password"
//     </div>
//     <button>Submit</button>
//   </form>
//   `);
// });

// router.post('/login', (req: RequestWithBody, res: Response) => {
//   const { email, password } = req.body;

//   if (email) {
//     res.send(email.toUpperCase());
//   } else {
//     res.send('you must provide an email');
//   }
// });

// export { router };

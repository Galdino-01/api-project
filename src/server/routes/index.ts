// Express
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = Router();

// Controllers
import { UsersControllers, PublicControllers } from '../controllers';

// Middlewares
import { ensureAuthenticated } from '../shared/middlewares';

// Test routes
router.get('/', (_, res) => {
    res.sendStatus(StatusCodes.OK).json({ message: 'Hello World!' });
});
router.post('/post', (req, res) => {
    res.sendStatus(StatusCodes.OK).json(req.body);
});

// Users routes
    // GET

    // POST
    
//  ...

// Public routes
    // GET

    // POST
    router.post('/sign-in')
    router.post('/sign-up', PublicControllers.SignUpValidation, PublicControllers.SignUp)

//  ...

export { router };

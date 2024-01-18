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


// Public routes
    // GET

    // POST
    router.post('/sign-in', PublicControllers.SignInValidation, PublicControllers.SignIn)
    router.post('/sign-up', PublicControllers.SignUpValidation, PublicControllers.SignUp)

//  ...

// Users routes
    // GET
    router.get('/user-by-id', ensureAuthenticated, UsersControllers.UserByIdValidation, UsersControllers.UserById)
    // POST
    
//  ...




export { router };

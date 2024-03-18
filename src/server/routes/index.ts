// Express
import { NextFunction, Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const router = Router();

// Controllers
import { UsersControllers, PublicControllers } from "../controllers";

// Middlewares
import { ensureAuthenticated } from "../shared/middlewares";

// Test routes
router.get("/", (req: Request, res: Response) => {
    res.sendStatus(StatusCodes.OK);
});
router.post("/", (req: Request, res: Response) => {
    res.sendStatus(StatusCodes.OK).json(req.body);
});

// Public routes
// GET

// POST
router.post("/sign-in", PublicControllers.SignInValidation, PublicControllers.SignIn);
router.post("/sign-up", PublicControllers.SignUpValidation, PublicControllers.SignUp);

//  ...

// Users routes
// GET
router.get("/user-by-id", ensureAuthenticated, UsersControllers.UserByIdValidation, UsersControllers.UserById);
// POST

//  ...

// Default return if a route is not founded
router.use((req: Request, res: Response) => {
    return res.status(404).json({
        errors: {
            message: "Route not found"
        }
    });
});


export { router };

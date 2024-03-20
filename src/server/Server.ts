// Express
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

// Dotenv
import "dotenv/config";

// Server
import { router } from "./routes";

const server = express();

server.use(cors({
    origin: process.env.ENABLE_CORS || "*",
}));

server.use(express.json());

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof SyntaxError) {
        return res.status(400).json({
            errors: {
                message: "The request body could not be decoded as JSON."
            }
        });
    }
});

server.use(router);

export { server };

import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import { Request, Response, NextFunction } from 'express-serve-static-core';

import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import * as path from "path";



// database dependency injection
export default function (database) {
    const app: express.Application = express();
    const basePath: string = '/api'

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const swaggerSpec = YAML.load(path.join(__dirname, './swagger/swagger.yaml'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use(basePath + '/auth', authRouter);
    app.use(basePath + '/user', userRouter);

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(error)
        res.json({ error })
    });

    return app;
}

import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import logger from './utils/client/logger';
import * as middlewares from './middlewares';
import routes from './routes';
import { appConfig } from './config/app-config';

const APP_PORT = appConfig.APP.PORT;
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    // return res.status(200).json({
    //     data: {
    //         time: new Date().toISOString()
    //     }
    // });

    fs.readFile(path.join(__dirname, '/ui/form.html'), (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

//Middleware to be executed before API control.
app.use(middlewares.before());

//Actual API routes
app.use('/api', routes);

//Middleware to be executed after API
app.use(middlewares.after(app));

app.listen(APP_PORT, () => {
    logger.info('Listening on port %o', APP_PORT);
});



import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
import { appConfig } from './lib/config';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

if (appConfig.development) {
  const corsOptions = {
    origin: appConfig.frontendUrl,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});

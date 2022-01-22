import * as express from "express";
import * as cors from "cors";
import { Request, Response, NextFunction, Application } from "express";
import { StatusCodes } from "http-status-codes";
import * as logger from "morgan";
const app: Application = express();
import * as api from "./api";
import { createData } from "./utils/default-scripts";
const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));
app.get(`/sample-get`, async (req: Request, res: Response, next: NextFunction) => {
  res.status(OK).send("Hello");
});
app.post(`/sample-post`, (req: Request, res: Response) => {
  res.send(req.body);
});
app.use(`/api`, api);

// Default scripts
createData();

/**
 * Global Error handler
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res
    .status(
      (error as any).code < 600 ? (error as any).code : INTERNAL_SERVER_ERROR
    )
    .send({ errors: [{ error: error.message || (error as any).error }] });
});
export = app;

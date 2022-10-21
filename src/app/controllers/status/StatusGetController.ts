import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { injectable } from "inversify";
import { ParsedQs } from "qs";
import { Controller } from "../Controller";

@injectable()
export class StatusGetController implements Controller {
  constructor() {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    res.status(200).send();
  }
}

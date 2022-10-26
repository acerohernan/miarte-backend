import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { injectable } from "inversify";
import { ParsedQs } from "qs";
import { Controller } from "../Controller";

@injectable()
export class FileImagePostController implements Controller {
  constructor() {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    console.log(req.file);
    res.status(200).send({ link: "link" });
  }
}

import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserSignuper } from "../../../Context/User/application/UserSignuper";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserSignUpPostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserSignuper) private signuper: UserSignuper
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { email, password, username } = req.body;

    await this.signuper.run({
      email,
      password,
      username,
    });
    res.status(201).send();
  }
}

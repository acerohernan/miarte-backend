import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserPasswordRestorer } from "../../../Context/User/application/user-restore-password/UserPasswordRestorer";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserRestorePasswordPostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserPasswordRestorer)
    private restorer: UserPasswordRestorer
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { code, password, re_password } = req.body;

    await this.restorer.run({ code, password, re_password });

    res.status(200).send();
  }
}

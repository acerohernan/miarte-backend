import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserForgotPasswordHandler } from "../../../Context/User/application/user-forgot-password/UserForgotPasswordHandler";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserForgotPasswordPostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserForgotPasswordHandler)
    private handler: UserForgotPasswordHandler
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { email } = req.body;

    const { code } = await this.handler.run({ email });

    res.status(200).send({ code });
  }
}

import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserForgotPasswordVerifier } from "../../../Context/User/application/user-verify-forgot-password-code/UserForgotPasswordVerifier";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserVerifyForgotPasswordGetController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserForgotPasswordVerifier)
    private verifier: UserForgotPasswordVerifier
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { code } = req.query;

    await this.verifier.run({ code: String(code) });
    res.status(200).send();
  }
}

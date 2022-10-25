import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserAuthenticator } from "../../../Context/User/application/user-login/UserAuthenticator";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserLoginPostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserAuthenticator)
    private authenticator: UserAuthenticator
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { email, password } = req.body;

    const { token } = await this.authenticator.run({ email, password });
    res.status(200).send({ token });
  }
}

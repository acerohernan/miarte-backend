import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserGetter } from "../../../Context/User/application/user-get-information/UserGetter";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserGetController implements Controller {
  constructor(@inject(CONTAINER_TYPES.UserGetter) private getter: UserGetter) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { id } = res.locals.user;
    const { user } = await this.getter.run({ id });
    res.status(200).send({ user });
  }
}

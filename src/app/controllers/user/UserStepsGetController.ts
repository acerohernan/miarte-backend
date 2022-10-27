import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserStepsFinder } from "../../../Context/UserSteps/application/get-steps/UserStepsFinder";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserStepsGetController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserStepsFinder) private finder: UserStepsFinder
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { id } = res.locals.user;

    const { steps } = await this.finder.run({ user_id: id });

    res.status(200).send({ steps });
  }
}

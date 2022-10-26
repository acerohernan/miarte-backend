import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserInformationUpdater } from "../../../Context/User/application/user-update-information/UserInformationUpdater";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserInformationPutController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserInformationUpdater)
    private updater: UserInformationUpdater
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { id } = res.locals.user;
    const {
      name,
      surname,
      description,
      copyright_name,
      copyright_url,
      profile_url,
      banner_url,
      visible_real_name,
      show_age_in_profile,
      show_city_and_country_in_profile,
      allow_users_message_me,
      marketing_off_site,
      send_special_offers,
    } = req.body;

    await this.updater.run({
      id,
      name,
      surname,
      description,
      copyright_name,
      copyright_url,
      profile_url,
      banner_url,
      visible_real_name,
      show_age_in_profile,
      show_city_and_country_in_profile,
      allow_users_message_me,
      marketing_off_site,
      send_special_offers,
    });

    res.status(200).send();
  }
}

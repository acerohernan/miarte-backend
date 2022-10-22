import { injectable } from "inversify";

type Params = {
  email: string;
  password: string;
  username: string;
};

@injectable()
export class UserSignuper {
  constructor() {}

  async run(params: Params) {
    console.log("Signuping...", params);
  }
}

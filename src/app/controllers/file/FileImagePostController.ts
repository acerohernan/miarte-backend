import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { injectable } from "inversify";
import { ParsedQs } from "qs";
import config from "../../../Context/Shared/infrastructure/config";
import { uploadImage } from "../../helpers/multer";
import { Controller } from "../Controller";

@injectable()
export class FileImagePostController implements Controller {
  constructor() {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    uploadImage(req, res, (error) => {
      if (error) {
        if (error.message === "File too large")
          return res.status(400).send({
            error: "File too big. The maximun size is 1MB",
          });
      }

      if (!req.file)
        return res.status(400).send({
          error:
            "The file must be an image with extension .jpg, .jpeg or .png and the maximun size is 1MB",
        });

      const imageLink = `${config.url}/file/images/${req.file?.filename}`;

      res.status(200).send({ link: imageLink });
    });
  }
}

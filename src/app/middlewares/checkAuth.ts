import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../Context/Shared/infrastructure/config";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(httpStatus.UNAUTHORIZED).send({ error: "Unathorized" });

  const { decoded, error } = decodeJwt(token);

  if (error)
    return res.status(httpStatus.UNAUTHORIZED).send({ error: "Unathorized" });

  const { sub, email } = decoded;
  res.locals.user = { id: sub, email };
  next();
}

function decodeJwt(token: string): {
  decoded: any;
  expired: boolean;
  error: boolean;
} {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return {
      decoded,
      expired: false,
      error: false,
    };
  } catch (error: any) {
    return {
      decoded: null,
      expired: error.message === "jwt expired",
      error: true,
    };
  }
}

import { Response } from "express";
import * as jwt from "jsonwebtoken";

import { __prod__ } from "@/config/env";
import User from "@/models/user";

const cookieOptions = {
  httpOnly: true,
  secure: __prod__,
  sameSite: "lax",
  path: "/",
  domain: __prod__ ? `.${process.env.DOMAIN}` : "",
} as const;

export const createTokens = (user: any) => {
  const accessToken = {};
  const refreshToken = {};

  return { accessToken, refreshToken };
};

export const validateTokens = async (
  accessToken: string | undefined,
  refreshToken: string | undefined,
  res: Response
) => {
  try {
    let user: any | null = null;

    if (accessToken) {
    }

    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    let data: any | null = null;

    try {
      data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    } catch {
      throw new Error("Invalid refresh token");
    }

    if (!data) {
      throw new Error("Invalid refresh token");
    }

    user = await User.findOne({ where: { id: data.userId } });

    if (!user || user.refreshTokenVersion !== data.refreshTokenVersion) {
      throw new Error("Invalid refresh token");
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      createTokens(user);

    const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const refreshTokenExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    res.cookie("accessToken", newAccessToken, {
      ...cookieOptions,
      expires: accessTokenExpires,
    });
    res.cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      expires: refreshTokenExpires,
    });
  } catch {}
};

export const sendCookies = (res: Response, user: any) => {
  const { accessToken, refreshToken } = createTokens(user);

  const accessTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const refreshTokenExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    expires: accessTokenExpires,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    expires: refreshTokenExpires,
  });
};

export const clearCookies = (res: Response) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
};

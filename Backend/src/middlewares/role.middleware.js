import { ApiError } from "../utils/ApiError.js";

export const isAdmin = (req, res, next) => {
  if (["orgAdmin", "superAdmin"].includes(req.user?.role)) {
    return next();
  }
  throw new ApiError(403, "Admin access required");
};

export const isIssuer = (req, res, next) => {
  if (req.user?.role === "issuer" || ["orgAdmin", "superAdmin"].includes(req.user?.role)) {
    return next();
  }
  throw new ApiError(403, "Issuer access required");
};

export const isMember = (req, res, next) => {
  if (req.user?.role === "member") {
    return next();
  }
  throw new ApiError(403, "Member access required");
};

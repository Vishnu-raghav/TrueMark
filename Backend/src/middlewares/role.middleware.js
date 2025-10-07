import { ApiError } from "../utils/ApiError.js";

/**
 * Check if logged-in user is organization admin or super admin
 */
export const isOrgAdminOrIssuer = (req, res, next) => {
  if (!req.user || !req.user.role) {
    throw new ApiError(403, "Unauthorized access");
  }

  const allowedRoles = ["orgAdmin", "superAdmin", "issuer"];
  if (allowedRoles.includes(req.user.role)) {
    return next();
  }

  throw new ApiError(403, "Admin or Issuer access required");
};

/**
 * Check if user is admin (orgAdmin or superAdmin)
 */
export const isAdmin = (req, res, next) => {
  if (req.user?.role === "orgAdmin" || req.user?.role === "superAdmin") {
    return next();
  }
  throw new ApiError(403, "Admin access required");
};

/**
 * Check if user is issuer
 */
export const isIssuer = (req, res, next) => {
  if (req.user?.role === "issuer") {
    return next();
  }
  throw new ApiError(403, "Issuer access required");
};

/**
 * Check if user is member
 */
export const isMember = (req, res, next) => {
  if (req.user?.role === "member") {
    return next();
  }
  throw new ApiError(403, "Member access required");
};

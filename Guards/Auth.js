const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const businessService = require('../Services/Business');

class AuthGuard {
  static async protect(req, res, next) {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verification token
    /**
     * @param {{JWT_SECRET:string}} process.env
     */
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if business still exists
    const currentBusiness = await businessService.getBusiness({ _id: decoded.id });
    if (!currentBusiness) {
      return next(
        new AppError(
          'The business belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if business changed password after the token was issued
    if (currentBusiness.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'Business recently changed password! Please log in again.',
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.business = currentBusiness;
    next();
  }

  static guest(req, res, next) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      return next(new AppError('You have no permission here', 403));
    }

    next();
  }

}

module.exports = AuthGuard;

const AppError = require('../../utils/appError');
const Email = require('../../utils/email');
const businessService = require('../../Services/Business');

class LoadController {
  static getMe(req, res, next) {
    req.params.id = req.business._id;
    next();
  }

  static async getBusiness(req, res) {
    const data = { business: null, investor: null, admin: null };
    data.business = await businessService.getBusiness({ _id: req.params.id });
    return res.status(201).json({
      message: 'Business Retrieved successfully',
      status: 'success',
      data: data,
    });
  }

  static async signUp(req, res) {
    req.body.type = 'email';
    req.body.slug =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const newBusiness = await businessService.createBusiness(req.body);

    const url = `${req.protocol}://${req.get('host')}/api/v1/verify/${
      req.body.slug
    }`;
    await new Email(newBusiness, url).sendWelcome();

    return businessService.createSendToken(newBusiness, 201, res);
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if business exists && password is correct
    const business = await businessService.getBusiness({ email }, true);

    if (!business || !(await business.correctPassword(password, business.password))) {
      return next(new AppError('Incorrect email or password', 403));
    }

    // 3) If everything ok, send token to client
    return businessService.createSendToken(business, 200, res);
  }

  static logout(req, res) {
    res.cookie('jwt', 'loggedOut', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  }

  static async verify(req, res, next) {
    const ver = businessService.verify(req.params.token);

    if (!ver) {
      return next(new AppError('This business does not exist', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Business account has been verified!',
    });
  }
}

module.exports = LoadController;

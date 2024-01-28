const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const OK = 200;
const CREATED = 201;
const SOLT_ROUND = 10;

async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    return res.status(OK).json(users);
  } catch (err) {
    return next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    return res.status(OK).json(user);
  } catch (err) {
    return next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const {
      name = 'Жак-Ив Кусто', about = 'Исследователь', avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png', email, password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, SOLT_ROUND);
    const user = new User({
      name, about, avatar, email, password: hashedPassword,
    });

    await user.save();

    const userRes = {
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    };

    return res.status(CREATED).json(userRes);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные при создании пользователя'));
    }
    return next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    user.name = req.body.name;
    user.about = req.body.about;
    await user.validate();
    await user.save();
    return res.status(OK).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные при обновлении пользователя'));
    }
    return next(err);
  }
}

async function updateAvatar(req, res, next) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    const { avatar } = req.body;
    user.avatar = avatar;

    await user.validate();
    await user.save();

    return res.status(OK).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные при обновлении пользователя'));
    }
    return next(err);
  }
}

async function getMyProfile(req, res, next) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    return res.status(OK).json(user);
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '1w' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(OK).json({ message: 'Авторизация успешна', token, email: user.email });
      }
      throw new UnauthorizedError('Неверный пароль');
    }
    throw new UnauthorizedError('Пользователь не найден');
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  getMyProfile,
  login,
};

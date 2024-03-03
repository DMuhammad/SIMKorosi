const db = require("../db/models/index");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.sequelize.models.User;

module.exports = {
  async register(req, res) {
    const { username, password, confPassword, id_role } = req.body;

    if (password !== confPassword) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Password tidak sama",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({
        id: uuidv4(),
        username: username,
        password: hashPassword,
        id_role: id_role,
      });

      res.status(201).json({
        status: "success",
        code: 201,
        message: "Data user berhasil ditambahkan",
        data: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  },
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: "Password Salah",
        });
      }

      const accessToken = jwt.sign(
        { id: user.id, username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { id: user.id, username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      await User.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: "success",
        code: 200,
        message: "Login Berhasil",
        data: {
          id: user.id,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: error.message,
      });
    }
  },
  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken) {
        return res.status(402).json({
          status: "error",
          code: 402,
          message: "Refresh token tidak ditemukan",
        });
      }

      const user = await User.findOne({
        where: {
          refresh_token: refreshToken,
        },
      });

      if (!user) {
        return res.status(403).json({
          status: "error",
          code: 403,
          message: "Akun tidak ditemukan",
        });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(403).json({
              status: "error",
              code: 403,
              message: err,
            });
          }
          const id = user.id;
          const accessToken = jwt.sign(
            { id },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );

          res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil mengambil access token",
            data: {
              accessToken,
            },
          });
        }
      );
    } catch (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  },
  async logout(req, res) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(402).json({
        status: "error",
        code: 402,
        message: "Refresh token tidak ditemukan",
      });
    }
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      return res.status(402).json({
        status: "error",
        code: 402,
        message: "Akun tidak ditemukan",
      });
    }
    await User.update(
      {
        refresh_token: null,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Logout berhasil",
    });
  },
};

const db = require("../db/models/index");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.sequelize.models.User;

module.exports = {
  async register(req, res) {
    const { namalengkap, email, password, confpassword } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Email sudah terdaftar",
      });
    }

    if (password !== confpassword) {
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
        nama_lengkap: namalengkap,
        email,
        password: hashPassword,
      });

      res.status(201).json({
        status: "success",
        code: 201,
        message: "Registrasi Berhasil",
        data: {
          id: user.id,
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
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: "Akun tidak ditemukan",
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: "Email atau Password Salah",
        });
      }

      const accessToken = jwt.sign(
        { id: user.id, email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      const refreshToken = jwt.sign(
        { id: user.id, email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "5m" }
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
        maxAge: 5 * 60 * 1000,
      });

      res.status(200).json({
        status: "success",
        code: 200,
        message: "Login Berhasil",
        data: {
          id: user.id,
          nama: user.nama_lengkap,
          accessToken,
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
              expiresIn: "1m",
            }
          );

          res.status(200).json({
            status: "success",
            code: 200,
            message: "Berhasil mengambil access token",
            data: {
              id: user.id,
              nama: user.nama_lengkap,
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
    res.clearCookie("refresh_token", {
      httpOnly: true,
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Logout berhasil",
    });
  },
};

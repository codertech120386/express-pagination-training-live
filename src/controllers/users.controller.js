const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.get("/", async (req, res) => {
  const page = +req.query.page || 1;
  const size = +req.query.limit || 10;

  const offset = (page - 1) * size;

  const users = await User.find({}).skip(offset).limit(size).lean().exec();

  const totalPages = Math.ceil(
    (await User.find({}).countDocuments().lean().exec()) / size
  );

  res.status(200).json({ data: { users, totalPages } });
});

module.exports = router;

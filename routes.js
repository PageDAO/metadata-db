const express = require("express");
const Token = require("./models/Token");
const router = express.Router();

router.get("/tokens", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/tokens", async (req, res) => {
  const token = new Token({
    title: req.body.title,
    content: req.body.content
  });
  await token.save();
  res.send(token);
});

router.get("/token/:id", async (req, res) => {
  try {
    const token = await Token.findOne({ _id: req.params.id });
    res.send(token);
  } catch {
    res.status(404);
    res.send({ error: "Token doesn't exist!" });
  }
});

router.patch("/token/:id", async (req, res) => {
  try {
    const token = await Token.findOne({ _id: req.params.id });

    if (req.body.title) {
      token.title = req.body.title;
    }

    if (req.body.content) {
      token.content = req.body.content;
    }

    await token.save();
    res.send(token);
  } catch {
    res.status(404);
    res.send({ error: "Token doesn't exist!" });
  }
});

router.delete("/tokens/:id", async (req, res) => {
  try {
    await Token.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Token doesn't exist!" });
  }
});

module.exports = router;

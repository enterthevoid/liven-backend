const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET WORKS",
  });
});

router.post("/", (req, res, next) => {
  const work = {
    id: Math.random(),
    name: req.body.name,
    description: req.body.description,
    photos: req.body.photos,
  };

  res.status(200).json({
    message: "Created",
    work: work,
  });
});

router.get("/:workId", (req, res, next) => {
  const id = req.params.workId;
  console.log(id);
  res.status(200).json({
    message: "GET element by ID",
    workId: id,
  });
});

router.patch("/:workId", (req, res, next) => {
  const id = req.params.workId;
  res.status(201).json({
    message: "PATCH element by ID",
    workId: id,
  });
});

router.delete("/:workId", (req, res, next) => {
  const id = req.params.workId;
  res.status(200).json({
    message: "DELETE element by ID",
    workId: id,
  });
});

module.exports = router;

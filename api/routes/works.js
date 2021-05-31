const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../auth/check-auth");

// Controllers

const WorksController = require("../controllers/works");

// Multer configuration

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      new Date().toISOString() + file.originalname.replace(/\s/g, "")
    );
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(new Error("Something went wrong"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// Routes

router.get("/", WorksController.works_get_all);

router.post(
  "/",
  upload.array("photos", 30),
  checkAuth,
  WorksController.works_create_work
);

router.get("/:workId", WorksController.works_get_work_by_id);

router.post(
  "/:workId",
  upload.array("photos", 30),
  checkAuth,
  WorksController.works_update_work
);

router.delete("/:workId", checkAuth, WorksController.works_delete_work);

module.exports = router;

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");
const upload = require("../utils/multer");

router.post("/upload", upload.single("data"), studentController.upload);
router.get("/", studentController.getByResult);
router.get("/:id/result", studentController.getById);

module.exports = router;

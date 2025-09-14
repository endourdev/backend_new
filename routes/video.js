const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadVideo } = require("../controllers/video");
const { getVideos } = require("../controllers/getVideos");

// Multer pour stocker dans /uploadsvid avec ID + username
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploadsvid/"),
  filename: (req, file, cb) => {
    // récupération des infos user depuis cookies
    const userId = req.cookies.userId || "anon";
    const username = req.cookies.username || "unknown";

    // nettoyage du username pour éviter les caractères interdits dans un nom de fichier
    const safeUsername = username.replace(/[^a-z0-9_-]/gi, "_");

    // génération du nom de fichier
    const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newFileName = `${userId}_${safeUsername}_${uniqueId}${path.extname(file.originalname)}`;

    cb(null, newFileName);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("videoFile"), uploadVideo);

router.get("/get-all", getVideos);

module.exports = router;
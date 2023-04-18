import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadSingleFile = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json({ error: err.message });
    } else if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      const file = req.file;
      if (file) {
        res.status(200).json(file.filename);
      } else {
        res.status(400).json({ error: "No file uploaded" });
      }
    }
  });
};

export default uploadSingleFile;

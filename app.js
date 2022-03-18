// import express from "express";
// import imageFileHandler from "./api";
const imageFileHandler = require("./api.js");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { getImagesFromDb } = require("./api.js");
const app = express();
const port = 3001;

app.use(cors());

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

const upload = multer({dest:'./uploads/'});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/images", async (req,res)=>{
  const searchTerm = req.query.q; 
  console.log("REQ PARAMS:", req.query);
  const images =  await getImagesFromDb(searchTerm);
  res.send(images);
})

app.post("/images", upload.single('image'), async (req, res) => {
  console.log("REQ.FILE", req.file);

  console.log("REQ.BODY.IMAGE:",req.body);
  // console.log("REQ.FILE", req.file);

  const s3ImagePath = await imageFileHandler.saveToStorage(req.file);
  const exifMeta = await imageFileHandler.extractExif(req.file);

    const dbFields = {filename: req.file.filename, s3ImagePath: s3ImagePath, ...exifMeta};
    console.log("DBFIELDS:", dbFields);
    const imageData = await imageFileHandler.saveImageMetadataToDb(dbFields);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";

import Photo from "../models/Photo";

export async function createPhoto(req: Request, res: Response): Promise<Response> {
  const { title, description } = req.body;
  const newPhoto = {
    title: title,
    description: description,
    imagePath: (req as any).file.path
  };

  const photo = new Photo(newPhoto);
  await photo.save();
  
  return res.json({
    message: "Photo created successfully",
    photo
  });
}

export async function getPhotos(req: Request, res: Response): Promise<Response> {
  const photos = await Photo.find();

  if (photos.length === 0) {
    return res.json({
      message: "No photos found"
    });
  }

  return res.json({
    message: "Photos fetched successfully",
    photos
  });
}

export async function getPhoto(req:Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const photo = await Photo.findById(id);

  if (!photo) {
    return res.json({
      message: "No photo found",
    });
  }

  return res.json({
    message: "Photo fetched successfully",
    photo
  });
}

export async function deletePhoto(req:Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const photo = await Photo.findByIdAndDelete(id);

  if (photo) {
    await fs.unlink(path.resolve(photo.imagePath));
    return res.json({
      message: "Photo deleted successfully",
      photo,
    });
  } else {
    return res.json({
      message: "No photo found",
    });
  }

  
}

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { title, description } = req.body;

  const updatedPhoto = await Photo.findByIdAndUpdate(id, {
    title,
    description
  });

  if (!updatedPhoto) {
    return res.json({
      message: "No photo found",
    });
  }

  return res.json({
    message: "Photo updated successfully",
    updatedPhoto
  });
}
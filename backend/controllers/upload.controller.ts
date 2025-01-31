import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary konfigürasyonu
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Geçici storage için multer ayarı
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyaları yüklenebilir!'));
  }
}

export const uploadImage = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenemedi' });
    }

    try {
      // Buffer'ı base64'e çevir
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      
      // Cloudinary'ye yükle
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'serap-hair-studio',
        resource_type: 'auto'
      });

      res.json({ 
        url: result.secure_url,
        public_id: result.public_id 
      });
    } catch (error) {
      console.error('Cloudinary yükleme hatası:', error);
      res.status(500).json({ error: 'Dosya yüklenirken bir hata oluştu' });
    }
  });
}; 
import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  anasayfa: {
    galeri: [{
      resimUrl: { type: String },
      createdAt: { type: Date, default: Date.now }
    }]
  },
  
  hizmetler: [{
    baslik: { type: String },
    aciklama: { type: String },
    resimUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  
  kurumsal: {
    hakkimizda: { type: String },
    altbaslik: { type: String },
    imgUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
  },

  sonGuncelleme: { type: Date, default: Date.now }
});

export const Content = mongoose.model('Content', ContentSchema); 
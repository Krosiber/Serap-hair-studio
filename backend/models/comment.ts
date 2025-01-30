import mongoose from "mongoose";



const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  comment: { type: String, require: true },
  star: { type: String, required: true },
  like:{type:Number},
  createdAt: { type: String, default: () => formatDateToDayMonthYear(new Date()) } ,
  ip: String,
  location: String 
});

// Tarih formatlaması yapan bir fonksiyon
function formatDateToDayMonthYear(date: any) {
  const day = date.getDate();
  const month = date.getMonth() + 1;  // Ay 0'dan başladığı için +1 ekliyoruz
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
}
// Yorum Modelini oluşturuyoruz
export const Star = mongoose.model("comment", commentSchema);

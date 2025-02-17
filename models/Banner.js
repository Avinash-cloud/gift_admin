import mongoose, {model, Schema, models} from "mongoose";

const BannerSchema = new Schema({
 
  images: {type:String},

}, {
  timestamps: true,
});

export const Banner = models.Banners || model('Banners', BannerSchema);
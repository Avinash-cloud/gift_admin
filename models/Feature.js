import mongoose, {model, Schema, models} from "mongoose";

const FeatureSchema = new Schema({
 
  productId:{
    type:String,
    require:true,
    trim:true
  }

}, {
  timestamps: true,
});

export const Feature = models.Features || model('Features', FeatureSchema);
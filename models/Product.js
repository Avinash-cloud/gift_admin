import mongoose, {model, Schema, models} from "mongoose";
import { Unique } from "typeorm";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountedPrice: {
    type: String,
    min: 0
  },
  images: {
    type: [String], // Array of image URLs
    validate: {
      validator: function(arr) {
        return arr.every(url => typeof url === 'string');
      },
      message: 'Each image URL must be a string'
    }
  },
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},

  subcategory: {type:mongoose.Types.ObjectId, ref:'SubCategory'},
  property: {type:Object},

  sku: {
    type: String,
    trim: true,
    
  },
  id: {
    type: String,
    trim: true,
    
  },
  shortDescriptionPoints:{
    type: [String], // Array of image URLs
    

  },
  type:{
    type: String,
    
  },
  stockQuantity: {
    type: String,
    min: 0,
    default: 0
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

export const Product = models.Products || model('Products', ProductSchema);
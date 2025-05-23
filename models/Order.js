import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  
  line_items:Object,
  name:String,
  email:String,
  city:String,
  phone:String,
  postalCode:String,
  streetAddress:String,
  country:String,
  paid:Boolean,
  status:String,
  storedMessage:String,
  cart:Object,
  buyer_name:String,
  storedImageUrl:[String],
  storedusername:String,
  storednumber:String,
  gst:String,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);
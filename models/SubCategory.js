import mongoose, { model, models, Schema } from "mongoose";

const SubCategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' }, // Points to Category as the parent
  property: [{ type: Object }]
});

export const SubCategory = models?.SubCategory || model('SubCategory', SubCategorySchema);

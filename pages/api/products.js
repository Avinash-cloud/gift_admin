import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.ids) {
      const idsArray = req.query.ids.split(',');
      res.json(await Product.find({ id: { $in: idsArray } }));
    } else if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find().sort({ _id: -1 }));
    }
  }

  if (method === 'POST') {
    const {title, description,
      price,
      discountedPrice,
      images,
      category,
      properties,
      stockQuantity,
      sku,
      type,
      shortDescriptionPoints
      ,subcategory,property
      ,id,
      custom
    } = req.body;
    console.log("at creation" ,req.body)
  
    const productDoc = await Product.create({
      title,
      description,
      price,
      discountedPrice,
      images,
      category,
      properties,
      stockQuantity,
      sku,
      shortDescriptionPoints,
      type
      ,subcategory,property
      ,id
      ,custom
    });
  
    res.json(productDoc);
  }
  
  if (method === 'PUT') {
    const {title,stockQuantity,description,sku,price,images,category,properties,shortDescriptionPoints,_id,subcategory,property,type,id,custom} = req.body;
    console.log("put data is", req.body)
    await Product.updateOne({_id}, {title,stockQuantity,description,price,images,category,properties,sku,shortDescriptionPoints,subcategory,property,type,id,custom});
    res.json(true);
  }

  if (method === 'DELETE') {
    const { id, ids } = req.query; // Get both `id` and `ids` from query parameters
  
    if (id) {
      // Single delete if `id` is provided
      await Product.deleteOne({ _id: id });
      res.json({ success: true, message: 'Product deleted successfully.' });
    } else if (ids) {
      // Multiple delete if `ids` (comma-separated list) is provided
      const productIds = ids.split(',');
      await Product.deleteMany({ _id: { $in: productIds } });
      res.json({ success: true, message: `${productIds.length} products deleted.` });
    } else {
      // If neither `id` nor `ids` are provided, return an error
      res.status(400).json({ success: false, message: 'No id or ids provided.' });
    }
  }
}
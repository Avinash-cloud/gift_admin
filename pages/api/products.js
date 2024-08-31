import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}));
    } else {
      res.json(await Product.find());
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
    });
  
    res.json(productDoc);
  }
  
  if (method === 'PUT') {
    const {title,stockQuantity,description,sku,price,images,category,properties,shortDescriptionPoints,_id,subcategory,property,type} = req.body;
    console.log("put data is", req.body)
    await Product.updateOne({_id}, {title,stockQuantity,description,price,images,category,properties,sku,shortDescriptionPoints,subcategory,property,type});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}
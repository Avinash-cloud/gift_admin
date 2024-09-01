import { Feature } from "@/models/Feature";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Feature.findOne({_id:req.query.id}));
    } else {
      res.json(await Feature.find().sort({ _id: -1 }).limit(2));
    }
  }

  if (method === 'POST') {
    const {title,description,price,images} = req.body;
    const productDoc = await Feature.create({
        title,description,price,images
    })
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const {productId,_id} = req.body;
    console.log( req.body)
    await Feature.updateOne({_id}, {productId});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Feature.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}
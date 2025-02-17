import {Banner} from "@/models/Banner";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Banner.findOne({_id:req.query.id}));
    } else {
      res.json(await Banner.find().sort({ _id: -1 }).limit(3));
    }
  }

  if (method === 'POST') {
    console.log(req.body);
    
    const {imageURL} = req.body;
    const productDoc = await Banner.create({
      images: imageURL
    })
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const {images} = req.body;
    console.log( req.body)
    await Banner.updateOne({_id}, {images});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Banner.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}
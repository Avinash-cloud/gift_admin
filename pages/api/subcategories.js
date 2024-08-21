import { SubCategory } from "@/models/SubCategory"; // Updated to SubCategory model
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    res.json(await SubCategory.find().populate('parent'));
  }

  if (method === 'POST') {
    const { name, parentCategory, property } = req.body;
    const subCategoryDoc = await SubCategory.create({
      name,
      parent: parentCategory || undefined,
      property,
    });
    res.json(subCategoryDoc);
  }

  if (method === 'PUT') {
    const { name, parentCategory, property, _id } = req.body;
    const subCategoryDoc = await SubCategory.updateOne({ _id }, {
      name,
      parent: parentCategory || undefined,
      property,
    });
    res.json(subCategoryDoc);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await SubCategory.deleteOne({ _id });
    res.json('ok');
  }
}

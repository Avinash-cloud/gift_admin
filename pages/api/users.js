import {Users} from "@/models/Users";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    
      res.json(await Users.find().sort({ _id: -1 }));
     
    }
  }
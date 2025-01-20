import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo,setProductInfo] = useState();
  const {title} = router.query;
  useEffect(() => {
    if (!title) {
      return;
    }
    axios.get('/api/blogs?url='+title).then(response => {
      setProductInfo(response.data.data);
    });
  }, [title]);
  function goBack() {
    router.push('/blog');
  }
  async function deleteProduct() {
    await axios.delete('/api/blogs?url='+title);
    goBack();
  }

  console.log(productInfo);
  
  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete
        &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="bg-red-400 w-11 rounded-xl">Yes</button>
        <button
          className="bg-blue-400 w-11 rounded-xl"
          onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}

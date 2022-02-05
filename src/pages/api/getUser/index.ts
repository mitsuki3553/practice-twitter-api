// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import needle from "needle";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // リクエストパラメータを変数に代入
  const getParam = req.query;
  
  const userName = getParam.userName;
  
  //ベアラートークンを代入
  const token = process.env.BEARER_TOKEN;

  // エンドポイントの指定
  const endpointUrl =`https://api.twitter.com/2/users/by/username/${userName}`;

  async function getRequest() {
    const params = {
      "user.fields": "description,profile_image_url",
    };

    const res = await needle(
      "get",
      endpointUrl,
      params,
      {
        headers: {
          "User-Agent": "v2RecentSearchJS",
          authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (res.body) {
      return res.body;
    } else {
      throw new Error("Unsuccessful request");
    }
  }

  (async () => {
    try {
      const response = await getRequest();
      
      res.status(200).json(response);

    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
  })();
}

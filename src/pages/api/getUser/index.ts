// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import needle from "needle";

//ユーザーデータを取得したときの型
type UserData = {
    description:string; 
    id: string;
    name: string;
    pinned_tweet_id: string;
    profile_image_url: string;
    username: string;
  };

  type IncludesContent = {
    id: string;
    public_metrics: {
      like_count: number;
      quote_count: number;
      reply_count: number;
      retweet_count: number;
    };
    text: string;
  };

  type User = {
    data:UserData;
    includes: IncludesContent[];
  }
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // リクエストパラメータを変数に代入
  const getParam = req.query;
  const userName = getParam.userName;

  //ベアラートークンを代入
  const token = process.env.BEARER_TOKEN;

  
  async function getUser() {
    // エンドポイントの指定
    const endpointUrl = `https://api.twitter.com/2/users/by/username/${userName}`;
    
    const params = {
      "user.fields": "description,profile_image_url",
      "tweet.fields":"public_metrics",
      "expansions": "pinned_tweet_id",
    };

    const res = await needle("get", endpointUrl, params, {
      headers: {
        "User-Agent": "v2RecentSearchJS",
        authorization: `Bearer ${token}`,
      },
    });

    if (res.body ) {
      return res.body as User;
    } else {
      throw new Error("ユーザーの取得に失敗しました…");
    }
  }


  (async () => {
    try {
      const response = await getUser();
      
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
  })();
}

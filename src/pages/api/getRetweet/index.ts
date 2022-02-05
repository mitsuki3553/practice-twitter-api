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
  
  const getParam = req.query;

  const tweetId = getParam.tweetId;


  const token = process.env.BEARER_TOKEN;

  const endpointUrl = `https://api.twitter.com/2/tweets/${tweetId}/retweeted_by`;

  async function getRequest(cnt:number,pagination?:string) {
    
    try{
      let params;
      if(pagination && pagination !="first"){
        console.log(`無い方${pagination}`);
        params = { max_results: "100", pagination_token:pagination };  
      }else{
        console.log(`ある方${pagination}`);
        params = { "max_results": "100" };
      }
  
      const res = await needle("get", endpointUrl, params, {
        headers: {
          "User-Agent": "v2RecentSearchJS",
          authorization: `Bearer ${token}`,
        },
      });
  
      if (res.body) {
        return res.body;
      } else {
        throw new Error("情報の取得に失敗しました");
      }
    }catch(e){
      console.error(e);
      throw new Error("情報の取得に失敗しました");
    }
    
  }

  (async () => {
    try {
      // Make request
      let data = [];
      let next = "first";
      let cnt = 0;
      const startTime = Date.now();
        while(next){
          
          const response = await getRequest(cnt,next);
          data.push(response.data);
          cnt++;
          next = response.meta.next_token;

          const gap = Date.now() - startTime;
          if(gap >= 45000) {
            console.log("ループの強制終了！");
            break;
          }
        }

      res.statusCode = 200;  
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({data}));

    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
  })();
}

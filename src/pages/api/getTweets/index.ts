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

  const userId = getParam.userId;

  const token = process.env.BEARER_TOKEN;

  const endpointUrl =
    `https://api.twitter.com/2/users/${userId}/tweets`;

  async function getRequest() {
    const params = {
      "tweet.fields": "public_metrics",
    };

    const res = await needle("get", endpointUrl, params, {
      headers: {
        "User-Agent": "v2RecentSearchJS",
        authorization: `Bearer ${token}`,
      },
    });
    
    if (res.body) {
      return res.body;
    } else {
      throw new Error("Unsuccessful request");
    }
  }

  (async () => {
    try {
      // Make request
      const response = await getRequest();

      res.status(200).json(response);

    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
    // process.exit();
  })();
}

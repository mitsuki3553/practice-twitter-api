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

  // res.status(200).json({ name: "John Doe" });

  //過去7日以内のツイートを検索します
  // https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

  // const needle = require("needle");

  //以下のコードは、環境変数からベアラートークンを設定します
  // macOSまたはLinuxで環境変数を設定するには、ターミナルから以下のexportコマンドを実行します。
  // BEARER_TOKEN = 'YOUR-TOKEN'をエクスポートします
  //const token = process.env.BEARER_TOKEN;のBEARER_TOKEN部分だけ自分のTOKENに変えても％文字がエラー判定になるので書き換えた
  const token = process.env.BEARER_TOKEN;

  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

  async function getRequest() {
    //以下のクエリパラメータを編集します
    //検索クエリ、および必要な追加フィールドを指定します（今回はハッシュタグso954で検索）
    //日本語も検索できるがUTF-8BOM無しファイルでちゃんと保存しているか確認
    //デフォルトでは、ツイートIDとテキストフィールドのみが返されます
    const params = {
      query: "#so954",
      "tweet.fields": "author_id",
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

      console.dir(response, {
        depth: null,
      });
    } catch (e) {
      console.log(e);
      process.exit(-1);
    }
    // process.exit();
  })();
}

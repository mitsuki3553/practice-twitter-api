//ユーザーデータを取得したときの型
export type User = {
  data: UserData;
  includes: IncludesContent[];
};

export type UserData = {
  description: string;
  id: string;
  name: string;
  pinned_tweet_id: string;
  profile_image_url: string;
  username: string;
};

export type IncludesContent = {
  id: string;
  public_metrics: {
    like_count: number;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
  };
  text: string;
};

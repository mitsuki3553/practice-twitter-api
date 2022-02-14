import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "src/styles/Home.module.css";
import { useSharedState } from "src/utils/globalState";
import Image from "next/image";

type Tweet = {
  id: string;
  public_metrics: {
    like_count: number;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
  };
  text: string;
};

//ユーザーデータを取得したときの型
type UserData = {
  description: string;
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
  data: UserData;
  includes: IncludesContent[];
};

const User: NextPage = () => {
  const [tweets, setTweets] = useState<Tweet[] | null>(null);
  const [_, setRetweet] = useSharedState("retweet", null);
  const [user] = useSharedState("user");
  const { query, replace } = useRouter();

  useEffect(() => {
    const getTweets = async () => {
      const res = await fetch(`api/getTweets?userId=${query.user}`);
      const json = await res.json();
      setTweets(json.data);
    };
    if (query.user) getTweets();
  }, [query.user]);

  return (
    <main className={styles.main}>
      {user ? (
        <>
          <Image
            src={user.data.profile_image_url}
            alt="プロフ画像"
            height={50}
            width={50}
          />
          <div>
            {user.data.name}@{user.data.username}
          </div>
        </>
      ) : (
        <div>NoUser</div>
      )}
      <h1>ツイート一覧</h1>
      {user ? (
        <>
          {user.includes ? (
            user.includes.tweets?.map((item: IncludesContent) => {
              return (
                <div
                  key={item.id}
                  className={styles.box3}
                  onClick={async () => {
                    console.log(item.id);
                    const res = await fetch(
                      `api/getRetweet?tweetId=${item.id}`
                    );
                    const json = await res.json();
                    const nullException = await json.data.filter((i: any) => i);
                    console.log(json);
                    console.log(nullException);
                    setRetweet(nullException.flat());
                    await replace(`/retweet/${item.id}`);
                  }}
                >
                  <div>固定されたツイート</div>
                  <div>{item.text}</div>
                  <div>いいね：{item.public_metrics.like_count}</div>
                  <div>リツイート：{item.public_metrics.retweet_count}</div>
                </div>
              );
            })
          ) : (
            <div className={styles.box3}>固定ツイートはありません</div>
          )}
        </>
      ) : (
        <div>読込中…</div>
      )}

      <div>
        {tweets?.map((item) => {
          return (
            <div
              key={item.id}
              className={styles.box}
              onClick={async () => {
                console.log(item.id);
                const res = await fetch(`api/getRetweet?tweetId=${item.id}`);
                const json = await res.json();
                const nullException = await json.data.filter((i: any) => i);
                console.log(json);
                console.log(nullException);
                setRetweet(nullException.flat());
                await replace(`/retweet/${item.id}`);
              }}
            >
              <div>{item.text}</div>
              <div>いいね：{item.public_metrics.like_count}</div>
              <div>リツイート：{item.public_metrics.retweet_count}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default User;

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "src/styles/Home.module.css";
import { useSharedState } from "src/utils/globalState";

const User: NextPage = () => {
  const { query, replace } = useRouter();
  const [retweet] = useSharedState("retweet");
  const [name, setName] = useState("");
  const [timer, setTimer] = useState<any>(undefined);

  const handleStart = () => {
    const intervalId = setInterval(() => {
      const random = Math.floor(retweet.length * Math.random());
      console.log(retweet[random]);
      const name = retweet[random].name;
      const userName = retweet[random].username;
      setName(`${name}@${userName}`);
    }, 100);
    setTimer(intervalId);
  };

  const handleStop = () => {
    const random = Math.floor(retweet.length * Math.random());
    const name = retweet[random].name;
    const userName = retweet[random].username;
    setName(`${name}@${userName}`);
    clearInterval(timer);
    setTimer(undefined);
  };

  return (
    <main className={styles.main}>
      <button
        onClick={() => {
          replace("/");
        }}
      >
        トップへ
      </button>
      <div className={styles.box2}>{name}</div>

      <button onClick={handleStart} disabled={timer}>
        スタート！
      </button>

      <button onClick={handleStop} disabled={!timer}>
        ストップ！
      </button>
      <h1>リツイート一覧</h1>
      {retweet ? (
        retweet.map((item: any, index: number) => {
          return (
            <div key={index}>
              <span>
                {item.name}@{item.username}
              </span>
            </div>
          );
        })
      ) : (
        <div>No Data</div>
      )}
    </main>
  );
};

export default User;

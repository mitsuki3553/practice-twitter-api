import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "src/styles/Home.module.css";
import { useSharedState } from "src/utils/globalState";

type User = {
  description: string;
  id: string;
  name: string;
  profile_image_url: string;
  username: string;
};

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useSharedState("user",null);
  const { replace } = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>ルーレット</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>リツイートルーレット(仮)</h1>
        <Image
          src="/userNameExample.png"
          alt="ユーザー名の例"
          width={500}
          height={300}
        />
        <h2>誰のツイートを取得しますか？</h2>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <button
          onClick={async () => {
            const trimName = name.trim();
            const res = await fetch(`api/getUser?userName=${trimName}`);
            const json = await res.json();
            setUser(json.data);
            await replace(`/${json.data.id}`);
          }}
        >
          ボタン
        </button>
      </main>
    </div>
  );
};

export default Home;

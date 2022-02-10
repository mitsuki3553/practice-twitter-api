import Head from "next/head";

import styles from "src/styles/Home.module.css";

type Props = {
  children: JSX.IntrinsicAttributes;
};

export const Layout = (props: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>リツイートルーレット</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
    </div>
  );
};

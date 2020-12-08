import Head from "next/head";
import { useState } from "react";
import SoundMedia from "../components/sound-media";
import styles from "../styles/Home.module.css";

export default function Home() {
  const sounds = [
    "https://ringon.site/?do=get-file&id=5673",
    "https://ringon.site/?do=get-file&id=47528",
  ];

  const [sound1, setSound1] = useState(null);
  const [sound2, setSound2] = useState(null);

  const next = () => {
    if (!sound1) setSound1(sounds[0]);
    if (sound1 && !sound2) setSound2(sounds[1]);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Audio</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        ></link>
      </Head>

      <main>
        <h1 className="mb-4">Audio players with effect</h1>
        <div className="mb-5">
          <button className="mr-3">Back</button>
          <button onClick={next}>Next</button>
        </div>
        <div>
          <SoundMedia sound1={sound1} sound2={sound2} />
        </div>
      </main>
    </div>
  );
}

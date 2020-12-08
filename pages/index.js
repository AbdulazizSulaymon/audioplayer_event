import Head from "next/head";
import { useEffect, useState } from "react";
import SoundMedia from "../components/sound-media";
import styles from "../styles/Home.module.css";

export default function Home() {
  const sounds = [
    "https://ringon.site/?do=get-file&id=5673",
    "https://ringon.site/?do=get-file&id=47528",
    "https://ringon.site/?do=get-file&id=47611",
  ];

  const [sound1, setSound1] = useState(null);
  const [sound2, setSound2] = useState(null);
  const [number, setNumber] = useState(0);
  const [secund, setSecund] = useState(5);

  const back = () => {
    if (number > 0) setNumber(number - 1);
  };

  const next = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    // if (number == 0) setSound1(sounds[0]);
    // else if (number == 1) setSound2(sounds[1]);
    // else if (number == 2) {
    //   setSound1(sounds[1]);
    //   setSound2(sounds[2]);
    // } else if (number == 3) {
    //   console.log("null");
    //   setSound1(null);
    //   setSound2(null);
    //   setNumber(0);
    //   return 0;
    // }

    if (number == 1) {
      setSound1(sounds[0]);
      setSound2(null);
    } else if (number >= 2) {
      setSound1(sounds[number - 2]);
      setSound2(sounds[number - 1]);
    }
    if (number - 1 == sounds.length || number == 0) {
      setNumber(0);
      setSound1(null);
      setSound2(null);
    }
  }, [number]);

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
          <div className="mb-3">
            <label className="mr-2">Interval Secund:</label>
            <input
              className="px-2"
              value={secund}
              onChange={(e) => setSecund(e.target.value)}
            />
          </div>
          <button onClick={back} className="mr-3">
            Back
          </button>
          <button onClick={next}>Next</button>
        </div>
        <div>
          <SoundMedia sound1={sound1} sound2={sound2} secund={secund} />
        </div>
      </main>
    </div>
  );
}

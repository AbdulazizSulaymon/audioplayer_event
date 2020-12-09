import Head from "next/head";
import { useEffect, useState } from "react";
import SoundMedia from "../components/sound-media2";
import styles from "../styles/Home.module.css";

export default function Home() {
  const sounds = [
    {
      title: "https://ringon.site/?do=get-file&id=5673",
      fadein: 2,
      fadeout: 4,
    },
    {
      title: "https://ringon.site/?do=get-file&id=47528",
      fadein: 4,
      fadeout: 3,
    },
    {
      title: "https://ringon.site/?do=get-file&id=47611",
      fadein: 3,
      fadeout: 5,
    },
    {
      title: "https://ringon.site/?do=get-file&id=5673",
      fadein: 2,
      fadeout: 4,
    },
    {
      title: "https://ringon.site/?do=get-file&id=47528",
      fadein: 4,
      fadeout: 3,
    },
  ];

  const [sound1, setSound1] = useState({});
  const [sound2, setSound2] = useState({});
  const [number, setNumber] = useState(0);
  // const [secund, setSecund] = useState(5);

  const back = () => {
    if (number > 0) setNumber(number - 1);
  };

  const next = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
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
          {/* <div className="mb-3">
            <label className="mr-2">Interval Secund:</label>
            <input
              className="px-2"
              value={secund}
              onChange={(e) => setSecund(e.target.value)}
            />
          </div> */}
          <button onClick={back} className="mr-3">
            Back
          </button>
          <button onClick={next}>Next</button>
        </div>
        <div>
          <SoundMedia
            sound1={sound1?.title}
            sound2={sound2?.title}
            fadein1={sound1?.fadein}
            fadeout1={sound1?.fadeout}
            fadein2={sound2?.fadein}
            fadeout2={sound2?.fadeout}
          />
        </div>
      </main>
    </div>
  );
}

import { createRef, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const SoundMedia = (props) => {
  const { sound1, sound2 } = props;

  const [vol1, setVol1] = useState(1);
  const [vol2, setVol2] = useState(1);

  const s1 = createRef();
  const s2 = createRef();

  const minStep = 1;
  const maxStep = 100;
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const secund = 2;
  const delay = (secund * 1000) / maxStep;

  useEffect(() => {
    if (sound1 && sound2) setPlay(true);
    else {
      setVol1(1);
      setVol2(1);
    }
  }, [sound1, sound2]);

  useEffect(() => {
    if (play) {
      setTimeout(FadeAudios, delay);
    }
  }, [play]);

  useEffect(() => {
    if (play) {
      setTimeout(FadeAudios, delay);
    }
    if (step >= maxStep) {
      setStep(minStep);
      setPlay(false);
    }
  }, [step, play]);

  const FadeAudios = () => {
    const reverse = maxStep - step;
    setVol1(reverse / 100);
    setVol2(step / 100);

    setStep(step + 1);
  };

  console.log(vol1, vol2, step);

  return (
    <div>
      {sound1 && (
        <ReactAudioPlayer
          src={sound1}
          id={1}
          autoPlay
          controls
          volume={vol1}
          ref={s1}
          className="mr-3"
        />
      )}

      {sound2 && (
        <ReactAudioPlayer
          src={sound2}
          id={2}
          autoPlay
          controls
          volume={vol2}
          ref={s2}
        />
      )}
    </div>
  );
};

export default SoundMedia;

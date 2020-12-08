import { createRef, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const SoundMedia = (props) => {
  const { sound1, sound2, secund } = props;

  const [currentSound1, setCurrentSound1] = useState(null);
  const [currentSound2, setCurrentSound2] = useState(null);
  const [oldSoundGot, setOldSoundGot] = useState(false);
  useEffect(() => {
    setCurrentSound1(sound1);
    setCurrentSound2(sound2);
    if (currentSound1 && currentSound2 && currentSound2 == sound1) {
      setOldSoundGot(true);
      setCurrentSound1(sound2);
      setCurrentSound2(sound1);
    } else setOldSoundGot(false);
  }, [sound1, sound2]);

  const [vol1, setVol1] = useState(1);
  const [vol2, setVol2] = useState(1);

  const s1 = createRef();
  const s2 = createRef();

  const minStep = 1;
  const maxStep = 100;
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const delay = (secund * 1000) / maxStep;

  useEffect(() => {
    setPlay(0);
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
    if (oldSoundGot) {
      setVol2(reverse / 100);
      setVol1(step / 100);
    } else {
      setVol1(reverse / 100);
      setVol2(step / 100);
    }

    setStep(step + 1);
  };

  //   console.log(vol1, vol2, step);
  console.log(sound1, sound2);

  return (
    <div>
      {sound1 && (
        <ReactAudioPlayer
          src={currentSound1}
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
          src={currentSound2}
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

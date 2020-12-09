import React, { createRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactAudioPlayer from "react-audio-player";

const SoundMedia = (props) => {
  let { sound1, sound2, fadein1, fadeout1, fadein2, fadeout2 } = props;
  const defaultSecond = 3;

  const [currentSound1, setCurrentSound1] = useState(null);
  const [currentSound2, setCurrentSound2] = useState(null);
  const [curFadein1, setCurFadein1] = useState(3);
  const [curFadein2, setCurFadein2] = useState(3);
  const [curFadeout1, setCurFadeout1] = useState(3);
  const [curFadeout2, setCurFadeout2] = useState(3);
  const [oldSoundGot, setOldSoundGot] = useState(false);
  const [new1, setNew1] = useState(false);
  const [new2, setNew2] = useState(false);

  useEffect(() => {
    if (sound1 != currentSound1) setNew1(true);
    else setNew1(false);
    if (currentSound1 && currentSound2 && currentSound2 == sound1)
      setNew2(false);
    else setNew2(true);

    if (currentSound1 && currentSound2 && currentSound2 == sound1) {
      setOldSoundGot(true);
      setCurrentSound1(sound2);
      setCurrentSound2(sound1);
      setCurFadein1(parseFloat(fadein2) || defaultSecond);
      setCurFadein2(parseFloat(fadein1) || defaultSecond);
      setCurFadeout1(parseFloat(fadeout2) || defaultSecond);
      setCurFadeout2(parseFloat(fadeout1) || defaultSecond);
      console.log("<---");
    } else {
      setOldSoundGot(false);
      setCurrentSound1(sound1);
      setCurrentSound2(sound2);
      setCurFadein1(parseFloat(fadein1) || defaultSecond);
      setCurFadein2(parseFloat(fadein2) || defaultSecond);
      setCurFadeout1(parseFloat(fadeout1) || defaultSecond);
      setCurFadeout2(parseFloat(fadeout2) || defaultSecond);
      console.log("--->");
    }
  }, [sound1, sound2]);

  console.log(curFadein1, curFadein2);

  const [vol1, setVol1] = useState(1);
  const [vol2, setVol2] = useState(1);

  const s1 = createRef();
  const s2 = createRef();

  const minStep = 1;
  const maxStep = 100;
  const [step1, setStep1] = useState(0);
  const [step2, setStep2] = useState(0);
  const [fade1, setFade1] = useState(false);
  const [fade2, setFade2] = useState(false);
  const getDelay = (time) => (time * 1000) / maxStep;

  useEffect(() => {
    changedSound(sound1, setFade1, setVol1);
    changedSound(sound2, setFade2, setVol2);
  }, [sound1, sound2]);

  const changedSound = (sound, setFade, setVol) => {
    if (sound) {
      setFade(true);
    } else {
      setFade(false);
      setVol(0);
    }
  };

  useEffect(() => {
    if (fade1) {
      setTimeout(
        () => FadeAudios(step1, setStep1, setVol1, new1),
        new1 ? getDelay(curFadein1) : getDelay(curFadeout1)
      );
    }
    if (fade2) {
      setTimeout(
        () => FadeAudios(step2, setStep2, setVol2, new2),
        new2 ? getDelay(curFadein2) : getDelay(curFadeout2)
      );
    }
  }, [fade1, fade2, step1, step2]);

  useEffect(() => {
    if (step1 >= maxStep) {
      setFade1(false);
      setStep1(minStep);
      console.log("off 1");
    }
    if (step2 >= maxStep) {
      setFade2(false);
      setStep2(minStep);
      console.log("off 2");
    }
  }, [step1, step2]);

  const FadeAudios = (step, setStep, setVol, isnew) => {
    let reverse = maxStep - step;
    if (reverse < 0) reverse = 0;

    if (isnew) {
      setVol(step / 100);
    } else {
      setVol(reverse / 100);
    }

    setStep(step + 1);
  };

  //   console.log(vol1, vol2, step);
  // console.log(sound1, sound2, fadein1, fadeout1, fadein2, fadeout2);

  return (
    <div>
      <div>
        {sound1 && (
          <ReactAudioPlayer
            src={currentSound1}
            id={1}
            autoPlay
            controls
            volume={vol1}
            ref={s1}
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
      <div className="d-flex">
        <p>vol1: {vol1} |</p>
        <p>vol2: {vol2} </p>
      </div>
      <div className="d-flex">
        <p>step1: {step1} |</p>
        <p>step2: {step2} </p>
      </div>
      <div className="d-flex">
        <p>fade1: {fade1.toString()} | </p>
        <p>fade2: {fade2.toString()} </p>
      </div>
    </div>
  );
};

export default SoundMedia;

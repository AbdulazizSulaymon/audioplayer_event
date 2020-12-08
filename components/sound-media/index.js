import { createRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const SoundMedia = (props) => {
  console.log("props".props);

  const { sound1, sound2 } = props;

  const [vol1, setVol1] = useState(1);
  const [vol2, setVol2] = useState(1);

  const s1 = createRef();
  const s2 = createRef();

  return (
    <div>
      <ReactAudioPlayer
        src={sound1}
        id={1}
        autoPlay
        controls
        volume={vol1}
        ref={s1}
        className="mr-3"
      />

      <ReactAudioPlayer
        src={sound2}
        id={2}
        autoPlay
        controls
        volume={vol2}
        ref={s2}
      />
    </div>
  );
};

export default SoundMedia;

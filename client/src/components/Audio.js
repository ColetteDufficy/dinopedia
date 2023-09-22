import React, { useState, useEffect } from "react";
import logo from "../dino-logo.png"
const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({url}) => {
  const [playing, toggle] = useAudio(
    "https://www.nhm.ac.uk/content/dam/nhmwww/take-part/dippy-on-tour/jurassic-soundscape.mp3"
  );

  return (
      <div>
        <img
          onClick={toggle} id="logo-pic"
          src={logo}
          alt="dino logo"
        /> 
        {playing}
      </div>
      );
    };

export default Player;

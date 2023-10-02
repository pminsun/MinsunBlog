import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "public/aboutAni.json";

export default function LottiAnimation() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: "90%", height: "90%" }}
    />
  );
}

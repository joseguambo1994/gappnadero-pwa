import { useLottie } from "lottie-react";
import ballAnimation from "../../lotties/ball.json";

const LottieAnimation = () => {
  const options = {
    animationData: ballAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return View;
};

export default LottieAnimation;
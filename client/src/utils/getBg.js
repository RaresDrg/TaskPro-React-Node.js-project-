import a from "../assets/images/backgrounds/micro/bg-1_micro.png";
import b from "../assets/images/backgrounds/desktop/bg-1_desktop.jpg";

export function getBg(variant, name) {
  switch (variant) {
    case "micro":
      // return a;
      return `/assets/${name}_micro.png`;
    case "mobile":
      return b;
      return `images/backgrounds/mobile/${name}_mobile.jpg`;
    case "tablet":
      return b;
      return `images/backgrounds/tablet/${name}_tablet.jpg`;
    case "desktop":
      return b;
      return `images/backgrounds/desktop/${name}_desktop.jpg`;
    default:
      return "none";
  }
}

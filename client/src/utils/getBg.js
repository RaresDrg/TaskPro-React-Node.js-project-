import a from "../assets/images/backgrounds/micro/bg-1_micro.png";

console.log(a);

export function getBg(variant, name) {
  switch (variant) {
    case "micro":
      return a;
    case "mobile":
      return `images/backgrounds/mobile/${name}_mobile.jpg`;
    case "tablet":
      return `images/backgrounds/tablet/${name}_tablet.jpg`;
    case "desktop":
      return `images/backgrounds/desktop/${name}_desktop.jpg`;
    default:
      return "none";
  }
}

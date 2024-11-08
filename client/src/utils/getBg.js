export function getBg(variant, name) {
  switch (variant) {
    case "micro":
      return `/assets/${name}_micro.png`;
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

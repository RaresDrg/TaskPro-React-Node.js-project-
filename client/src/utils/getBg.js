export function getBg(variant, name) {
  switch (variant) {
    case "micro":
      return `/${name}_micro.png`;
    case "mobile":
      return `/src/assets/images/backgrounds/mobile/${name}_mobile.jpg`;
    case "tablet":
      return `/src/assets/images/backgrounds/tablet/${name}_tablet.jpg`;
    case "desktop":
      return `/src/assets/images/backgrounds/desktop/${name}_desktop.jpg`;
    default:
      return "none";
  }
}

export function getBg(variant, name) {
  switch (variant) {
    case "micro":
      return new URL(
        `../assets/images/backgrounds/micro/${name}_micro.png`,
        import.meta.url
      ).href;
    case "mobile":
      return new URL(
        `../assets/images/backgrounds/mobile/${name}_mobile.jpg`,
        import.meta.url
      ).href;
    case "tablet":
      return new URL(
        `../assets/images/backgrounds/tablet/${name}_tablet.jpg`,
        import.meta.url
      ).href;
    case "desktop":
      return new URL(
        `../assets/images/backgrounds/desktop/${name}_desktop.jpg`,
        import.meta.url
      ).href;
    default:
      return "none";
  }
}

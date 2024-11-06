import { useMediaQuery } from "react-responsive";

const useReactResponsive = () => {
  const isOnMobile = useMediaQuery({ maxWidth: 767.5 });
  const isOnTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439.5 });
  const isOnDesktop = useMediaQuery({ minWidth: 1440 });

  return {
    isOnMobile,
    isOnTablet,
    isOnDesktop,
  };
};

export default useReactResponsive;

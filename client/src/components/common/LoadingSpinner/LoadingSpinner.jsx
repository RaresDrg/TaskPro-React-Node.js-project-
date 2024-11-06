import { useEffect } from "react";
import "animate.css";

const LoadingSpinner = ({ className: styles }) => {
  useEffect(() => {
    document.body.style.cursor = "wait";

    return () => (document.body.style.cursor = "auto");
  }, []);

  return (
    <div className={`${styles} animate__animated animate__fadeIn`}>
      <div className="Loader"></div>
    </div>
  );
};

export default LoadingSpinner;

import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";

const NotFoundPage = ({ className: styles }) => {
  const navigate = useNavigate();
  const sectionRef = useRef();

  function handleGoingBack() {
    sectionRef.current.classList.replace(
      "animate__fadeIn",
      "animate__fadeOutLeft"
    );
    setTimeout(() => navigate("/"), 700);
  }

  const videoSrc =
    "https://cdn.pixabay.com/video/2016/05/18/3226-167234359_tiny.mp4";

  return (
    <section
      className={`${styles} animate__animated animate__fadeIn`}
      ref={sectionRef}
    >
      <video autoPlay={true} muted={true} loop={true}>
        <source src={videoSrc} type="video/mp4" />
      </video>

      <button className="go-back-btn" onClick={handleGoingBack}>
        <UseAnimations
          animation={arrowDown}
          size={45}
          strokeColor={"#fff"}
          className="arrow"
        />
      </button>

      <h2>Oops! - Page not found</h2>
      <h1 className="animate__animated animate__flash animate__infinite animate__slow">
        404
      </h1>
      <p>
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
    </section>
  );
};

export default NotFoundPage;

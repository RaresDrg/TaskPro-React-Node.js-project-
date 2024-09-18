import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import notFoundBgVideo from "../../assets/video/notFoundBgVideo.mp4";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";
import "animate.css";

const NotFoundPage = ({ className: styles }) => {
  const navigate = useNavigate();
  const { theme } = useAuth();
  const sectionRef = useRef();

  function handleGoingBack() {
    sectionRef.current.classList.replace("animate__fadeIn", "animate__fadeOut");
    setTimeout(() => navigate("/"), 700);
  }

  return (
    <section
      className={`${styles} animate__animated animate__fadeIn `}
      ref={sectionRef}
    >
      <video autoPlay={true} muted={true} loop={true}>
        <source src={notFoundBgVideo} type="video/mp4" />
      </video>

      <button
        className={`go-back-btn ${theme ?? ""}`}
        onClick={handleGoingBack}
      >
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

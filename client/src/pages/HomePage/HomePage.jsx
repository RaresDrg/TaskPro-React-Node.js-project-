import Container from "../../components/common/Container/Container.styled";
import homePageImg from "../../assets/images/homePageImg.png";
import homePageImg_2x from "../../assets/images/homePageImg_2x.png";
import { LogoOnHomePage as Logo } from "../../components/common/Logo/Logo.styled";
import FormButton from "../../components/common/FormButton/FormButton.styled.js";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { notifyWarning, notifySuccess } from "../../utils/notify.js";
import { useDispatch } from "react-redux";
import { handleGoogleAuth } from "../../redux/auth/operations.js";

// todo: vercel
// "http://localhost:3000/api/users/google-auth"
// "https://taskproserver.vercel.app/api/users/google-auth";

const HomePage = ({ className: styles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const pathname = location.pathname;
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const googleAuthFailed = queryParams.get("googleAuthFailed");
    if (googleAuthFailed) {
      notifyWarning(googleAuthFailed);
      window.history.replaceState({}, document.title, pathname);
      return;
    }

    const validationToken = queryParams.get("googleAuthSuccess");
    if (validationToken) {
      dispatch(handleGoogleAuth(validationToken))
        .unwrap()
        .then((value) => notifySuccess(`Welcome, ${value.data.user.name} !`))
        .catch(() => notifyWarning("Google authentication failed !"))
        .finally(() => {
          window.history.replaceState({}, document.title, pathname);
        });
      return;
    }
  }, []);

  return (
    <section className={styles}>
      <Container className={`animate__animated animate__fadeInDown`}>
        <img
          srcSet={`${homePageImg} 1x, ${homePageImg_2x} 2x`}
          src={homePageImg}
          alt="computer"
        />
        <Logo />
        <p>
          Supercharge your productivity and take control of your tasks with{" "}
          <b>TaskPro</b> - Don&apos;t wait, start achieving your goals now !
        </p>
        <nav>
          <FormButton
            text={"Register"}
            type={"button"}
            variant={"blackBtn"}
            handlerFunction={() => navigate("/register")}
          />
          <FormButton
            text={"Log in"}
            type={"button"}
            variant={"blackBtn"}
            handlerFunction={() => navigate("/login")}
          />
          <FormButton
            text={"Auth with Google"}
            type={"button"}
            variant={"blackBtn"}
            handlerFunction={() =>
              (window.location.href =
                "https://taskproserver.vercel.app/api/users/google-auth")
            }
          />
        </nav>
      </Container>
    </section>
  );
};

export default HomePage;

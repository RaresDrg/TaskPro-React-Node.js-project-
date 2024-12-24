import Container from "../../components/common/Container/Container.styled";
import homePageImg from "../../assets/images/homePageImg.png";
import homePageImg_2x from "../../assets/images/homePageImg_2x.png";
import { LogoOnHomePage as Logo } from "../../components/common/Logo/Logo.styled";
import FormButton from "../../components/common/FormButton/FormButton.styled.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { notifyWarning, notifySuccess } from "../../utils/notify.js";
import { useDispatch } from "react-redux";
import { handleGoogleAuth } from "../../redux/auth/slice.js";

// todo: vercel
// "http://localhost:3000/api/users/google-auth"
// "https://taskproserver.vercel.app/api/users/google-auth";

const HomePage = ({ className: styles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const googleAuthError = Cookies.get("googleAuthError");
    if (googleAuthError) {
      notifyWarning(googleAuthError);
      Cookies.remove("googleAuthError");
      return;
    }

    const googleAuthSuccess = Cookies.get("googleAuthSuccess");
    if (googleAuthSuccess) {
      const user = JSON.parse(googleAuthSuccess);
      dispatch(handleGoogleAuth({ user: { ...user } }));
      notifySuccess(`Welcome, ${user.name} !`);
      Cookies.remove("googleAuthSuccess");
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

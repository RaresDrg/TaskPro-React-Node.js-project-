import Container from "../../components/common/Container/Container.styled";
import homePageImg from "../../assets/images/homePageImg.png";
import homePageImg_2x from "../../assets/images/homePageImg_2x.png";
import { LogoOnHomePage as Logo } from "../../components/common/Logo/Logo.styled";
import FormButton from "../../components/common/FormButton/FormButton.styled.js";
import { useNavigate } from "react-router-dom";

const HomePage = ({ className: styles }) => {
  const navigate = useNavigate();

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
        </nav>
      </Container>
    </section>
  );
};

export default HomePage;

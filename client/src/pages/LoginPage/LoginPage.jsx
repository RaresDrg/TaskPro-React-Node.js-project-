import Container from "../../components/common/Container/Container.styled";
import LoginForm from "../../components/LoginForm/LoginForm.styled";

const LoginPage = ({ className: styles }) => {
  return (
    <section className={styles}>
      <Container>
        <LoginForm />
      </Container>
    </section>
  );
};

export default LoginPage;

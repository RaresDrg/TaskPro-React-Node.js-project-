import Container from "../../components/common/Container/Container.styled";
import RegisterForm from "../../components/RegisterForm/RegisterForm.styled";

const RegisterPage = ({ className: styles }) => {
  return (
    <section className={styles}>
      <Container>
        <RegisterForm />
      </Container>
    </section>
  );
};

export default RegisterPage;

import useAuth from "../../hooks/useAuth";
import Container from "../../components/common/Container/Container.styled";

// todo: tranzitii

const ProjectPage = ({ className: styles }) => {
  const { theme } = useAuth();

  return (
    <section className={`${styles} ${theme}`}>
      <Container>
        <h1>Project Page</h1>
      </Container>
    </section>
  );
};

export default ProjectPage;

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Container from "../../components/common/Container/Container.styled";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm.styled";

const ResetPasswordPage = ({ className: styles }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const validationToken = searchParams.get("validationToken");

  useEffect(() => {
    !validationToken && navigate("/*", { replace: true });
  }, []);

  return (
    <section className={styles}>
      <Container>
        <ResetPasswordForm validationToken={validationToken} />
      </Container>
    </section>
  );
};

export default ResetPasswordPage;

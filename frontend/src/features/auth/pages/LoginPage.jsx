import AuthLayoutLogin from "../components/AuthLayoutLogin";
import LoginForm from "../components/LoginForm";
import AuthHeader from "../components/AuthHeader";

const LoginPage = () => {
  return (
    <AuthLayoutLogin>
      <AuthHeader
        text="New to Manifest?"
        linkText="Create account"
        path="/signup"
        active="login"
      />
      <LoginForm />
    </AuthLayoutLogin>
  );
};

export default LoginPage;
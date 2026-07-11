import AuthLayoutSignUp from "../components/AuthLayoutSignUp";
import SignupForm from "../components/SignupForm";
import AuthHeader from "../components/AuthHeader";

const SignupPage = () => {
  return (
    <AuthLayoutSignUp>
      <AuthHeader
        text="Already have an account?"
        linkText="Sign in"
        path="/login"
        active="signup"
      />
      <SignupForm />
    </AuthLayoutSignUp>
  );
};

export default SignupPage;
import React from "react";
import SignUpForm from "../../components/signin/SignUpForm";
import Layout from "../../components/layout/Layout";

const SignUp = () => {
  return (
    <Layout title="회원가입" highlight={"mainpage/accommodations"}>
      <SignUpForm />
    </Layout>
  );
};

export default SignUp;

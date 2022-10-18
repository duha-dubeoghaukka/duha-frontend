import React from "react";
import LogInForm from "../../components/login/LogInForm";
import Layout from "../../components/layout/Layout";

const LogIn = () => {
  return (
    <Layout title="로그인" highlight={""} isFooterFixed={true}>
      <LogInForm />
    </Layout>
  );
};

export default LogIn;

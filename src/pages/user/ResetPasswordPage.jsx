import React from "react";
import ResetPasswordForm from "../../components/form/ResetPasswordForm";
import Layout from "../../components/layout/Layout";

function ResetPasswordPage() {
  return (
    <Layout title="마이페이지" highlight={"mypage/edit"}>
      <ResetPasswordForm />
    </Layout>
  );
}

export default ResetPasswordPage;

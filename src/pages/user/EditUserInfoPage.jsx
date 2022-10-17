import React from "react";
import Layout from "../../components/layout/Layout";
import EditUserInfoForm from "../../components/form/EditUserInfoForm";

function EditUserInfoPage() {
  return (
    <Layout title="마이페이지" highlight={"mypage/edit"} isFooterFixed={true}>
      <EditUserInfoForm />
    </Layout>
  );
}

export default EditUserInfoPage;

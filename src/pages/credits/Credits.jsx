import Layout from "../../components/layout/Layout";

const Credits = () => {
  return (
    <Layout title={"출처 및 저작권자 정보"} highlight={""} isLoggedIn={false} isFooterFixed={true}>
      <div className="mt-10">
        <img src="/assets/Logo.png" alt="Logo" />
      </div>
    </Layout>
  );
};

export default Credits;

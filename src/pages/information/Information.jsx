import Layout from "../../components/layout/Layout";
import { useState } from "react";
import Transportation from "./transportation/Transportation";
import CallTaxi from "./calltaxi/CallTaxi";
import Porter from "./porter/Porter";

const Information = () => {
  const [category, setCategory] = useState("transportation");
  const categoryClickHandler = category => {
    setCategory(category);
  };
  let content;
  switch (category) {
    case "transportation":
      content = <Transportation />;
      break;
    case "calltaxi":
      content = <CallTaxi />;
      break;
    case "porter":
      content = <Porter />;
      break;
  }
  return (
    <Layout isLoggedIn={false} title={"뚜벅이를 위한 서비스"} highlight={"mainpage/info"}>
      <div className="flex justify-around my-8">
        <p
          className={`cursor-pointer font-bold text-lg ${
            category === "transportation" ? "text-green1" : "text-black1 hover:brightness-[5]"
          }`}
          onClick={() => categoryClickHandler("transportation")}
        >
          이동수단
        </p>
        <p
          className={`cursor-pointer font-bold text-lg ${category === "calltaxi" ? "text-green1" : "text-black1 hover:brightness-[5]"}`}
          onClick={() => categoryClickHandler("calltaxi")}
        >
          콜택시
        </p>
        <p
          className={`cursor-pointer font-bold text-lg ${category === "porter" ? "text-green1" : "text-black1 hover:brightness-[5]"}`}
          onClick={() => categoryClickHandler("porter")}
        >
          짐배달
        </p>
      </div>
      <div>{content}</div>
    </Layout>
  );
};

export default Information;

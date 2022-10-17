import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, userInfoAPIs } from "../../api/api";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getCode } from "../../utils/getCode";

const SignupSchema = yup.object().shape({
  // email: yup.string().email("이메일 형식으로 입력해주세요").required("이메일은 필수값입니다"),
  nickname: yup.string().min(2, "2글자 이상으로 입력해주세요").required("닉네임은 필수값입니다"),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,}$/, "영문/숫자 조합 8글자 이상으로 입력해주세요")
    .required("비밀번호는 필수값입니다"),
  confirmPassword: yup
    .string()
    .required("비밀번호는 필수값입니다")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다")
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const code = getCode();
  const [email, setEmail] = useState();

  useEffect(() => {
    userInfoAPIs
      .getUserEmail(code)
      .then(res => {
        if (res.data.isSuccess) {
          const email = res.data.data.email;
          setEmail(email);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log("err", err.response));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onChange"
  });

  const onSubmit = async singupInfo => {
    // 이메일 인증 절차를 거쳤기 때문에 중복 확인 주석처리
    // try {
    //   const { data } = await api.post("/member/emailcheck", {
    //     email: singupInfo.email
    //   });
    //   if (!data.isSuccess) {
    //     return alert(data.message);
    //   }
    // } catch (error) {
    //   throw new Error(error);
    // }

    // try {
    //   const { data } = await api.post("/member/nicknamecheck", {
    //     nickname: singupInfo.nickname
    //   });
    //   if (!data.isSuccess) {
    //     return alert(data.message);
    //   }
    // } catch (error) {
    //   throw new Error(error);
    // }

    try {
      const { data } = await api.post("/member/signup", {
        email: email,
        nickname: singupInfo.nickname,
        password: singupInfo.password
      });
      if (!data.isSuccess) {
        return alert(data.message);
      }
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="w-full md:w-[600px] mx-auto">
      <form className="flex flex-col mt-5 md:mt-10" onSubmit={handleSubmit(onSubmit)}>
        <img src="https://i.ibb.co/sHHr4Dj/2.png" className="w-[284px] mx-auto" alt={"Logo"} />
        <div className="relative w-full md:w-[500px] mx-auto">
          <input type="text" className="input mt-2 disabled:bg-transparent" name="email" value={email || ""} disabled />
          {/* <button
            className="absolute top-6 right-4 font-semibold text-green1 disabled:opacity-50"
            onClick={handleEmailDuplicateCheck}
            disabled={!watch().email}
          >
            중복확인
          </button> */}
        </div>
        <p className="input-helper">{errors.email?.message}</p>
        <div className="relative w-full md:w-[500px] mx-auto">
          <input type="text" placeholder="닉네임" className="input mt-2" {...register("nickname")} />
        </div>
        <p className="input-helper">{errors.nickname?.message}</p>
        <div className="relative w-full md:w-[500px] mx-auto">
          <input name="password" type="password" className="input mt-2" placeholder="비밀번호" {...register("password")} />
        </div>
        {errors.password && <p className="input-helper">{errors.password.message}</p>}
        <div className="relative w-full md:w-[500px] mx-auto">
          <input
            name="confirmPassword"
            type="password"
            className="input mt-2"
            placeholder="비밀번호 확인"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && <p className="input-helper">{errors.confirmPassword.message}</p>}
        <button type="submit" className="btn-primary mx-auto mt-6 mb-4 disabled:opacity-50">
          회원 가입
        </button>
        <p className="mx-auto my-4 text-gray-600">
          계정이 있으신가요?{" "}
          <Link to="/login" className="font-bold">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;

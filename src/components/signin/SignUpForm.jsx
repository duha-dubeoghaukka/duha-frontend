import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  email: yup.string().email("이메일 형식으로 입력해주세요").required("이메일은 필수값입니다"),
  nickname: yup.string().min(2, "2글자 이상으로 입력해주세요").required("닉네임은 필수값입니다"),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/, "영문/숫자 조합 4글자 이상으로 입력해주세요")
    .required("비밀번호는 필수값입니다"),
  confirmPassword: yup
    .string()
    .required("비밀번호는 필수값입니다")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다")
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onChange"
  });

  const onSubmit = async singupInfo => {
    try {
      const { data } = await api.post("/member/emailcheck", {
        email: singupInfo.email
      });
      if (!data.isSuccess) {
        return alert(data.message);
      }
    } catch (error) {
      throw new Error(error);
    }

    try {
      const { data } = await api.post("/member/nicknamecheck", {
        nickname: singupInfo.nickname
      });
      if (!data.isSuccess) {
        return alert(data.message);
      }
    } catch (error) {
      throw new Error(error);
    }

    try {
      const { data } = await api.post("/member/signup", {
        email: singupInfo.email,
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
      <form className="flex flex-col my-10" onSubmit={handleSubmit(onSubmit)}>
        <img src="https://i.ibb.co/sHHr4Dj/2.png" className="w-[284px] mx-auto" />
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          <input type="text" placeholder="이메일" className="input mt-2" {...register("email")} />
          {/* <button
            className="absolute top-6 right-4 font-semibold text-green1 disabled:opacity-50"
            onClick={handleEmailDuplicateCheck}
            disabled={!watch().email}
          >
            중복확인
          </button> */}
        </div>
        <p className="input-helper">{errors.email?.message}</p>
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          <input type="text" placeholder="닉네임" className="input mt-2" {...register("nickname")} />
          {/* <button className="absolute top-6 right-4 font-semibold text-green1 disabled:opacity-50" onClick={handlenicknameDuplicateCheck}>
            중복확인
          </button> */}
        </div>
        <p className="input-helper">{errors.nickname?.message}</p>
        <div className="relative w-[385px] md:w-[500px] mx-auto">
          <input name="password" type="password" className="input mt-2" placeholder="비밀번호" {...register("password")} />
        </div>
        {errors.password && <p className="input-helper">{errors.password.message}</p>}
        <div className="relative w-[385px] md:w-[500px] mx-auto">
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

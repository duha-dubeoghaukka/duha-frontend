import React from 'react';

const SignUpForm = () => {
  return (
    <div>
      <form className="flex flex-col">
        <input type="text" placeholder="아이디" className="input" />
        <input type="text" placeholder="닉네임" className="input" />
        <input type="text" placeholder="비밀번호" className="input" />
        <input type="text" placeholder="비밀번호 확인" className="input" />
      </form>
    </div>
  );
};

export default SignUpForm;

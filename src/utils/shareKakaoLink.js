export const shareKakao = (route, title) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK);
    }

    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: `${title}코스 확인하러가기`,
        imageUrl: "https://ifh.cc/g/soo5OO.png",
        link: {
          mobileWebUrl: route,
          webUrl: route
          // androidExecParams: "test"
        }
      },
      buttons: [
        {
          title: "코스 확인하러 가기",
          link: {
            mobileWebUrl: route,
            webUrl: route
          }
        }
      ]
    });
  }
};

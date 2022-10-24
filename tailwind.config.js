/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black1: "#161616",
        black2: "#454545",
        white1: "#F6F6F6",
        green1: "#7FB77E",
        grey1: "#757575"
      },
      backgroundImage: {
        "main-spot": "url('https://i.ibb.co/6RYFXC0/image.jpg')",
        "main-restaurant": "url('https://i.ibb.co/MhTXbMQ/image.jpg')",
        "main-accommodation": "url('https://i.ibb.co/ZGR6ny5/image.jpg')",
        "main-service": "url('https://i.ibb.co/x5h36pN/image.jpg')",
        "main-schedule": "url('https://i.ibb.co/5x9qhRQ/image.jpg')",
        "main-share-schedule": "url('https://i.ibb.co/N7dCWfc/image.jpg')",
        "main-weather": "url('https://i.ibb.co/kG0N6r5/image.jpg')",
        "main-sea": "url('https://i.ibb.co/02RvLxP/image.jpg')",
        "main-suntime": "url('https://i.ibb.co/MkkKKx9/jeju-island-gef9a74ee8-1920.jpg')"
      }
    }
  },
  plugins: []
};

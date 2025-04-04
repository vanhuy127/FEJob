const flowbite = require("flowbite-react/tailwind");

export default {
  content: [flowbite.content(), "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(), require("flowbite-typography")],
};

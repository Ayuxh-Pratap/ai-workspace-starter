/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 120,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
  tailwindFunctions: ['cn', 'tv'],
};

export default config;

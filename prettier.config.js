/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/env/(.*)$",
    "",
    "^~/components/(.*)$",
    "^~/db/(.*)$",
    "^~/lib/(.*)$",
    "^~/modules/(.*)$",
    "^~/styles/(.*)$",
    "^~/trpc/(.*)$",
    "^~/utils/(.*)$",
    "^~/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: false,
};

export default config;

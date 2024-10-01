import pluginReact from "eslint-plugin-react";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";

const { rules } = pluginReact;

export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  {rules: {
    'react/react-in-jsx-scope': 'off', 
    ...rules 
  }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];

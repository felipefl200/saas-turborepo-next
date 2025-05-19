import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration para projetos Node.js.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nodeConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "module",
    },
    rules: {
      // Regras específicas para Node.js podem ser adicionadas aqui
      "no-console": "off", // Permite uso de console.log
      "no-process-exit": "off", // Permite uso de process.exit
    },
  },
  {
    ignores: ["dist/**", "build/**"],
  },
];

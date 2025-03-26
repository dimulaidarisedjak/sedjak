// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/member-delimiter-style': 'off',
    '@stylistic/indent-binary-ops': 'off',
  },
});

module.exports = {
  extends: ['airbnb', 'next', 'turbo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};

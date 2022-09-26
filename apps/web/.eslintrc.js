module.exports = {
  root: true,
  extends: ['custom'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
};

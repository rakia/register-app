module.exports = {
  root: true,
  plugins: ['import'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@typescript-eslint/lines-between-class-members': ['off', 'always', { exceptAfterOverload: true }],
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            allowTemplateLiterals: true,
          },
        ],
        '@typescript-eslint/dot-notation': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
  ],
};

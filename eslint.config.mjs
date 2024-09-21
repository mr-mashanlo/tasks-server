import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: [ '**/*.js' ], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  { rules: {
    indent: [ 'error', 2 ],
    semi: [ 'error', 'always' ],
    quotes: [ 'error', 'single' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'space-in-parens': [ 'error', 'always' ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'no-trailing-spaces': [ 'error' ],
    'linebreak-style': [ 'error', 'unix' ],
    'jsx-quotes': [ 'error', 'prefer-double' ],
    'comma-dangle': [ 'error', { arrays: 'never', objects: 'never', imports: 'never', exports: 'never', functions: 'never' } ],
    'no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 0, maxBOF: 0 } ]
  } }
];
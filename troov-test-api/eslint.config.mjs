// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import jsdoc from 'eslint-plugin-jsdoc'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs['recommended-flat'],
  jsdoc.configs['flat/recommended-typescript'],

  {
    rules: {
      'jsdoc/require-jsdoc': [
        1,
        {
          contexts: [
            'ClassDeclaration',
            'FunctionDeclaration',
            'FunctionExpression',
            'MethodDefinition',
          ],
        },
      ],
    },
  },
)

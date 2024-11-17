import parser from '@typescript-eslint/parser';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    // Base Configuration for TypeScript Files
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    impliedStrict: true,
                },
            },
            globals: {
                global: true,
                process: true,
                __dirname: true,
                module: true,
                require: true,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            // TypeScript Recommended Rules
            ...tsPlugin.configs.recommended.rules,

            // Updated Rule Configuration
            '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],

            // Prettier Integration
            'prettier/prettier': 'error',
        },
    },

    // Overrides for Test Files
    {
        files: ['*.spec.ts*', '*.test.ts*'],
        rules: {
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];

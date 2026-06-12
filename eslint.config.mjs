import formatjs from '@aboutbits/eslint-config/configs/formatjs'
import jest from '@aboutbits/eslint-config/configs/jest'
import react from '@aboutbits/eslint-config/configs/react'
import ts from '@aboutbits/eslint-config/configs/ts'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ts,
  react,
  jest,
  formatjs,
  {
    ignores: ['dist', 'node_modules'],
  },
])

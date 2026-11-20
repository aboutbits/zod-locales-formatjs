import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/react-intl.ts'],
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  dts: true,
  tsconfig: 'tsconfig.json',
})

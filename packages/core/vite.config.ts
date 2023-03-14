import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const libraryName: string = 'gui';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: libraryName,
      fileName: format => `${libraryName}.${format}.js`
    },
    emptyOutDir: false,
    rollupOptions: {
      input: './src/index.ts',
      external: ['lodash'],
      output: {
        globals: {
          'lodash': 'lodash'
        }
      }
    },
  },
  esbuild: {
    jsx: 'preserve',
    jsxFactory: 'Gui.createElement',
    jsxFragment: 'Gui.Fragment'
  },
  resolve: {
    alias: [
      {
        find: "~",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [dts({ insertTypesEntry: true })]
});

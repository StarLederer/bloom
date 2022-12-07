import { resolve } from 'path'
import { defineConfig } from 'vite'
import unocss from '@unocss/vite';
import presetIcons from '@unocss/preset-icons';
import transformerDirective from '@unocss/transformer-directives'
import unocssPresetWrapp from "./unocss-preset";

const root = resolve("./src");
const dist = resolve("./dist");

export default defineConfig({
  root,

  base: "./",

  plugins: [
    unocss({
      presets: [
        presetIcons(),
        unocssPresetWrapp(),
      ],
      transformers: [
        transformerDirective(),
      ],
    }),
  ],

  build: {
    outDir: dist,
  }
})

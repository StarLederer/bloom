import { resolve } from 'path'
import { defineConfig } from 'vite'
import unocss from '@unocss/vite';
import presetIcons from '@unocss/preset-icons';
import transformerDirective from '@unocss/transformer-directives'
import unocssPresetWrapp from "./unocss-preset";

const root = resolve("./src");

export default defineConfig({
  root,

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
})

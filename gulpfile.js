import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

const src = 'src';
const dist = 'dist';

const argv = yargs(hideBin(process.argv)).argv;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, src);

const type = argv.type === 'module' ? 'module' : 'cjs';
const isModule = type === 'module';
const extensions = ['.ts', '.tsx'];
const outputExt = isModule ? '.js' : '.cjs';

export default () => {
  return gulp
    .src([`./${src}/**/*.ts`])
    .pipe(
      babel({
        plugins: isModule
          ? [['babel-plugin-add-import-extension', { extension: 'js' }]]
          : [['babel-plugin-add-import-extension', { extension: 'cjs' }], '@babel/plugin-transform-modules-commonjs'],
        presets: ['@babel/preset-typescript'],
      }),
    )
    .pipe(
      rename(function (path) {
        const filePath = join(root, path.dirname, path.basename);
        for (const ext of extensions) {
          if (existsSync(`${filePath}${ext}`)) {
            path.extname = outputExt;
            break;
          }
        }
      }),
    )
    .pipe(gulp.dest(isModule ? `${dist}/module` : `${dist}/cjs`));
};

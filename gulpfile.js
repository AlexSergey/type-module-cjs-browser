import gulp from 'gulp';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

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
  return gulp.src([
      `./${src}/**/*.ts`
    ])
    .pipe(babel({
      presets: ['@babel/preset-typescript'],
      plugins: isModule ? [
        [
          'babel-plugin-add-import-extension', { extension: 'js' }
        ]
      ] : [
        [
          'babel-plugin-add-import-extension', { extension: 'cjs' }
        ],
        '@babel/plugin-transform-modules-commonjs'
      ]
    }))
    .pipe(rename(function (path) {
      const filePath = join(root, path.dirname, path.basename);
      for (const ext of extensions) {
        if (existsSync(`${filePath}${ext}`)) {
          path.extname = outputExt;
          break;
        }
      }
    }))
    .pipe(gulp.dest(isModule ? `${dist}/module` : `${dist}/cjs`));
}

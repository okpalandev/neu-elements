import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';

export default {
    input: 'src/index.ts', // Entry point of your project
    output: {
        file: 'dist/neu-elements.umd.js', // Output file path
        format: 'umd', // UMD format
        name: 'neu-elements', // Name of your library
        sourcemap: false, // Generate sourcemaps
    },
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json',
        }), // Transpile TypeScript to JavaScript
        nodeResolve(), // Resolve node_modules dependencies
        commonjs(), // Convert CommonJS modules to ES modules
        scss({ output: 'dist/css/neu-elements.css' }), // Convert SCSS to CSS
        babel({ babelHelpers: 'bundled' }), // Transpile your code with Babel
        terser(), // Minify the output bundle
    ]
};

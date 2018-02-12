import resolve from 'rollup-plugin-node-resolve';
import legacy from 'rollup-plugin-legacy';

export default {
    input: 'target-tsc/index.js',
    output: {
        file: 'target-rollup/index.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        resolve(),
        legacy({
            // `parse-sizes` does not export anything. We use this plugin to add a named export.
            'node_modules/parse-sizes/parse-sizes.js': {
                parseSizes: 'parseSizes',
            },
        }),
    ],
};

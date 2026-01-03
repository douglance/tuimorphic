import { createPreset } from 'fumadocs-ui/tailwind-plugin';
const config = {
    content: [
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './content/**/*.{md,mdx}',
        './mdx-components.tsx',
        './node_modules/fumadocs-ui/dist/**/*.js',
    ],
    presets: [createPreset()],
    theme: {
        extend: {
            fontFamily: {
                mono: ['var(--font-mono)', 'GNU Unifont', 'monospace'],
            },
        },
    },
};
export default config;

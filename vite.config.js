import { defineConfig } from 'vite';
import { parse } from 'yaml';

// Petit plugin maison : permet d'écrire `import content from '../content.yaml'`.
const yamlPlugin = () => ({
  name: 'yaml-loader',
  transform(code, id) {
    if (!id.endsWith('.yaml') && !id.endsWith('.yml')) return null;
    return { code: `export default ${JSON.stringify(parse(code))};`, map: null };
  },
});

export default defineConfig({
  base: '/',
  plugins: [yamlPlugin()],
});

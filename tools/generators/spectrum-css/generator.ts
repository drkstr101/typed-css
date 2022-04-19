import {
  convertNxGenerator,
  generateFiles,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import glob from 'fast-glob';
import { writeFile } from 'fs';
import { basename, dirname, join } from 'path';
import { SpectrumCssGeneratorSchema } from './schema';

const ignore = ['commons', 'overlay'];

const templatePath = join(__dirname, 'files');

const toExportString = (name: string) =>
  `export { default as ${name} } from './lib/components/${name}';`;

/**
 * Given the original entry point to a css module component
 * (IE. vars.css for spectrum-css components) Generate a
 * new entrypoint index..module.css and import it.
 */
export async function spectrumCssGenerator(
  tree: Tree,
  schema: SpectrumCssGeneratorSchema
) {
  const { sourceRoot } = readProjectConfiguration(tree, schema.name);
  const globString = `${sourceRoot}/lib/components/*/vars.css`;
  const stream = glob
    .stream([globString], { ignore })
    .once('end', () => console.log('Done.'))
    .once('error', (err) => console.error(err));

  let entries: string[] = [];
  for await (const entry of stream) {
    if (typeof entry === 'string') {
      const sourceDir = dirname(entry);
      const name = basename(sourceDir);
      entries = [name, ...entries];
      const ctx = { name, tmpl: '' };
      await generateFiles(tree, templatePath, sourceDir, ctx);
    }
  }
  console.log('Entries:', entries);

  // export all components from the module entrypoint
  const content = entries.map(toExportString).join('\n');
  const outputFile = `${sourceRoot}/index.ts`;
  console.log(`outputting entries to ${outputFile}`);
  return await writeFile(outputFile, content, console.error);
}

export default spectrumCssGenerator;
export const spectrumCssSchematic = convertNxGenerator(spectrumCssGenerator);

import {
  convertNxGenerator,
  generateFiles,
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
  workspaceRoot,
} from '@nrwl/devkit';
import path, { basename, dirname, join } from 'path';
import { SpectrumCssGeneratorSchema } from './schema';
import glob from 'fast-glob';
import { writeFile } from 'fs';

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
  const globString = join(sourceRoot, `/lib/components/*/vars.css`);

  // run the generators in parallel if supported
  const stream = glob.stream(globString, { ignore });
  // .on('data', onStreamData)
  // .once('end', onStreamEnd)
  // .once('error', onStreamFail);

  let entries = [];
  for await (const entry of stream) {
    if (typeof entry === 'string') {
      const sourceDir = dirname(entry);
      const name = basename(sourceDir);
      const ctx = { name, tmpl: '' };
      entries = [name, ...entries];
      await generateFiles(tree, templatePath, sourceDir, ctx);
    }
  }

  // export all components from the module entrypoint
  const content = entries.map(toExportString).join('\n');
  writeFile(join(sourceRoot, `index.ts`), content, console.error);
}

export default spectrumCssGenerator;
export const spectrumCssSchematic = convertNxGenerator(spectrumCssGenerator);

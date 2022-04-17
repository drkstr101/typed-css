import {
  convertNxGenerator,
  generateFiles,
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
  workspaceRoot,
} from '@nrwl/devkit';
import { basename, dirname, join } from 'path';
import { SpectrumCssGeneratorSchema } from './schema';
import glob from 'fast-glob';

const ignore = ['commons', 'overlays'];

const templatePath = join(__dirname, 'files');

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
  const generator = async (entryPoint: string) => {
    const sourceDir = dirname(entryPoint);
    const name = basename(sourceDir);
    const outputDir = `dist/${sourceDir}`;

    // generate css modules
    await generateFiles(tree, templatePath, sourceDir, {
      name,
      tmpl: '',
    });

    // copy source files to output
    // await generateFiles(tree, sourceDir, outputDir, {});
  };

  // run the generators in parallel if supported
  glob
    .stream(globString, { ignore })
    .on('data', generator)
    .once('error', console.error);
}

export default spectrumCssGenerator;
export const spectrumCssSchematic = convertNxGenerator(spectrumCssGenerator);

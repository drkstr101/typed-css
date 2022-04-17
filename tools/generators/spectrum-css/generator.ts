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
    const componentPath = dirname(entryPoint);
    await generateFiles(tree, templatePath, componentPath, {
      name: basename(componentPath),
      tmpl: '',
    });
  };

  glob
    .stream(globString, { ignore })
    .on('data', generator)
    .once('error', console.error);
}

export default spectrumCssGenerator;
export const spectrumCssSchematic = convertNxGenerator(spectrumCssGenerator);

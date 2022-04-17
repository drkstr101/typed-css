import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { spectrumCssGenerator } from './generator';
import { SpectrumCssGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: SpectrumCssGeneratorSchema) {
  await spectrumCssGenerator(tree, schema);
  await formatFiles(tree);
  return () => void 0;
}

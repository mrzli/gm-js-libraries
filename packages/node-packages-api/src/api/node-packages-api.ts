import { NodePackagesApi } from '../types/node-packages-api';
import pacote, { Packument } from 'pacote';

export function createNodePackagesApi(): NodePackagesApi {
  return new NodePackagesApiImpl();
}

class NodePackagesApiImpl implements NodePackagesApi {
  public async getPackageLatestVersion(packageName: string): Promise<string> {
    const packument: Packument = await pacote.packument(packageName);
    return packument['dist-tags'].latest;
  }
}

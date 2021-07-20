export interface NodePackagesApi {
  readonly getPackageLatestVersion: (packageName: string) => Promise<string>;
}

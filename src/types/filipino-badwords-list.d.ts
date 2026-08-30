declare module "filipino-badwords-list" {
  const filipinoBadwordsList: {
    array: string[];
    object: Record<string, string[]>;
    regex: RegExp;
  };

  export default filipinoBadwordsList;
}

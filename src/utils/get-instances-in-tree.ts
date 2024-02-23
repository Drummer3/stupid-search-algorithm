/* eslint-disable */
/**
 * This function recursively searches for *EVERY* match in the tree
 *
 * @prop nodes: response from the back-end
 * @prop searchTerm: search input value
 *
 * @returns list of paths to search result joined with " > "
 */
export const getEveryMatchPath = (nodes: any, searchTerm: string) => {
  // timer for tracking funsies
  console.time("getEveryMatchPath");

  let result: any[] = [];

  // we start same as the exists-in-three.ts implementation
  for (const node of nodes) {
    //
    // we need to check if top level object has the matching title,
    // but we need to keep going since we are looking for *EVERY* occurrence
    if (node.title.includes(searchTerm)) {
      result.push([node.title]);
    }

    // same as before, we are starting recursive function
    const matchPaths = getMatchPath(node.children, searchTerm);

    // if we have matchPaths in this objects' children,
    // we run over it, append object's name to path's beginning
    // and join with some indicator. We then add this objects' children's
    // matches to the global results array as before.
    if (matchPaths) {
      result.push(matchPaths.map((e) => [node.title, ...e].join(" > ")));
    }
  }

  // ending timer before return ..... as expected this should take a bit more
  console.timeEnd("getEveryMatchPath");

  // returning with .flat(), since we have array of arrays in [result]
  // P.S i was too lazy to implement typing for this
  return result.flat();
};

/**
 *
 * This is the actual recursive part of the algorithm
 *
 * @prop nodes: children of the top level object and it's children, etc
 * @prop searchTerm: search input value
 * @prop path: saving path as we move along
 *
 * @returns array of arrays. [matchedPath1, matchedPath2, matchedPath3, ...]
 */
const getMatchPath = (
  nodes: any,
  searchTerm: string,
  path: string[] = [],
): any[] | null => {
  // same things as in exists-in-tree recursive part
  if (nodes.length === 0) return null;

  // in this variable we store matched object's paths in sub-tree
  let paths = [];

  for (const node of nodes) {
    // creating newPath here
    const newPath = [...path, node.title];

    // if we get the match we add newPath to [paths] variable *AND* keep going
    // NOTE: we used to return value here,
    // but we are looking for every match so we have keep going.
    if (node.title.includes(searchTerm)) {
      paths.push(newPath);
    }

    // recursion happens here and we are moving down the tree :P
    const matchingChildren = getMatchPath(node.children, searchTerm, newPath);

    // this could be cleaner but meh, it's 04:30 and i am too tired to do the cleaning
    // i think this and the return value should be cleaner,
    // but this is enough and more importantly works :P
    if (matchingChildren && matchingChildren.length) {
      paths.push(...matchingChildren);
    }
  }

  return paths.length ? paths : null;
};

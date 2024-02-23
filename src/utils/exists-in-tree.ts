/* eslint-disable */

/**
 * This function recursively searches for any object in children's list
 *    that has matching title to search term.
 * This function is highly efficient and very hackable.
 * Theoretically it's possible to pass `title` key and `children` key.
 *
 * @prop nodes: response from the back-end
 * @prop searchTerm: search input value
 *
 * @returns list of nodes
 */
export const existsInTree = (nodes: any, searchTerm: string): any[] => {
  // timer for tracking it's speed
  console.time("existsInTree");

  let result: any[] = [];

  // run over top level objects
  for (const node of nodes) {
    //
    // if the object by itself has a matching title
    // than we can avoid any recursion and move on
    if (node.title.includes(searchTerm)) {
      result.push(node);
    } else {
      //
      // otherwise we start recursive function, passing children and search term
      const doesSubTreeContain = subTreeContains(node.children, searchTerm);
      //
      // if this objects sub-tree has match we save it to the results array
      if (doesSubTreeContain) {
        result.push(node);
      }
    }
  }
  //
  // end timer before returning the result :P
  console.timeEnd("existsInTree");

  return result;
};

/**
 *
 * This is the actual recursive part of the algorithm
 *
 * @prop nodes: children of the top level object and it's children, etc
 * @prop searchTerm: search input value
 *
 * @returns whether or not there was a match in this sub-tree
 */
const subTreeContains = (nodes: any, searchTerm: string): boolean => {
  // if there are no children left to loop over we can return false
  if (nodes.length === 0) return false;

  for (const node of nodes) {
    // if this object's title matches we can stop the loop
    // and safely move to next *top level object*
    if (node.title.includes(searchTerm)) {
      return true;
    }

    // recursion happens here and we are moving down the tree :P
    const matchingChildren = subTreeContains(node.children, searchTerm);

    // if one of the child has matching title
    // we can stop checking this object's siblings
    //
    // NOTE: it's important to return true explicitly otherwise
    // only first child get's checked and it's siblings are skipped
    if (matchingChildren) {
      return true;
    }
  }

  // return false since we couldn't find object in this branch
  return false;
};

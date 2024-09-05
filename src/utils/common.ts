export function classnames(...classes: Array<string | undefined>): string {
  return classes.filter((el) => el).join(" ");
}

/**
 * Generates a unique ID.
 *
 * @param length - The length of the generated ID. Default is 16.
 * @returns A string representing the generated unique ID.
 */
export function generateUniqueId(length = 16): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";

  const timestamp = Date.now().toString(36);

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return timestamp + id;
}

/**
 * Retrieves the text content of a React element.
 *
 * @param parent - The parent React element.
 * @returns The text content of the React element.
 */
export function getReactElementText(parent: any): string {
  if (typeof parent === "string") {
    return parent;
  }

  if (
    parent === null ||
    typeof parent !== "object" ||
    !parent.props ||
    !parent.props.children ||
    (typeof parent.props.children !== "string" &&
      typeof parent.props.children !== "object")
  ) {
    return "";
  }

  if (typeof parent.props.children === "string") {
    return parent.props.children;
  }

  return parent.props.children
    .map((child: any) => getReactElementText(child))
    .join("");
}

/**
 * Removes an item at the given index from an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array from which to remove the item.
 * @param {number} index - The index of the item to remove.
 * @returns {T[]} - A new array with the item removed, or the original array if the index is out of bounds.
 */
export function removeItemAtGivenIndexFromArray<T>(
  array: T[],
  index: number
): T[] {
  if (index < 0 || index >= array.length) {
    return array;
  }
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

/**
 * Inserts an item into an array at the specified index.
 *
 * @template T - The type of the array elements.
 * @param {T[]} array - The array to insert the item into.
 * @param {T} item - The item to insert into the array.
 * @param {number} index - The index at which to insert the item.
 * @returns {T[]} - The updated array with the item inserted.
 */
export function insertItemIntoArrayAtGivenIndex<T>(
  array: T[],
  item: T,
  index: number
): T[] {
  if (index === null || index === undefined || index > array.length) {
    return [...array, item];
  }
  if (index < 0) {
    return [item, ...array];
  }
  return [...array.slice(0, index), item, ...array.slice(index)];
}

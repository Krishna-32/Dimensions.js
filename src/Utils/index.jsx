import clsx from "clsx"; 
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using the clsx library
 * 
 * @param {Array<string|Object|boolean>} classes - The class values to merge
 * @returns {string} Merged class names
 */
export const cn = (...classes) => twMerge(clsx(classes));

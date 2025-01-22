import clsx from "clsx"; 
import { twMerge } from "tailwind-merge";

/**
 * Merges and deduplicates Tailwind CSS classes
 * @param {...import("clsx").ClassValue} classes - The class values to merge
 * @returns {string} The merged class string
 */
export const cn = (...classes) => twMerge(clsx(classes));

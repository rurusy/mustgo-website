// Tiny classnames helper — avoids adding `clsx` as a dependency.
export function cn(...args) {
  return args
    .flat(Infinity)
    .filter((c) => typeof c === 'string' && c.length > 0)
    .join(' ')
}

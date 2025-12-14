/**
 * Utility for conditionally joining class names together.
 * Based on SRCL (Sacred Computer) - https://github.com/internet-development/www-sacred
 *
 * @example
 * classNames('foo', 'bar') // => 'foo bar'
 * classNames('foo', { bar: true }) // => 'foo bar'
 * classNames({ foo: true }, { bar: false }) // => 'foo'
 * classNames('foo', null, undefined, 'bar') // => 'foo bar'
 * classNames('foo', condition && 'bar') // => 'foo bar' or 'foo'
 */
export function classNames(
  ...args: Array<string | Record<string, boolean | undefined | null> | undefined | null | false>
): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

export default classNames;

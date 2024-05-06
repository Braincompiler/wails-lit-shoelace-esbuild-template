import * as process from 'node:process';

/**
 * Returns the value of the argument.
 *
 * @param {string} key
 * @return {string|null|boolean}
 */
export function argv(key) {
    // based on https://stackoverflow.com/a/69409483/309882

    // Return true if the key exists and a value is undefined
    if (process.argv.includes(`--${key}`)) {
        return true;
    }

    const value = process.argv.find((element) => element.startsWith(`--${key}=`));

    // Return null if the key does not exist and a value is undefined
    if (!value) {
        return null;
    }

    return value.replace(`--${key}=`, '');
}

/**
 * Returns the value of the argument as integer.
 *
 * @param {string} key
 * @return {number|null}
 */
export function argvInt(key) {
    const arg = argv(key);

    return arg !== true && arg != null ? parseInt(arg, 10) : null;
}

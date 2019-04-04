function isPowerOfFour(num) {
    if (num >= 1) {
        return num === 1 || (num % 4 === 0 && ((num & num - 1) === 0) && isPowerOfFour(num / 4));
    }
    return false;
}
console.log(isPowerOfFour(1));
console.log(isPowerOfFour(4));
console.log(isPowerOfFour(8));
console.log(isPowerOfFour(16));
console.log(isPowerOfFour(32));
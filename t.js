class NumArray {
    constructor(nums) {
        this._init(nums);
    }

    _init(nums) {
        let sums = this.sums = [nums[0] || 0];
        for (let i = 1, l = nums.length; i < l; i++) {
            sums[i] = sums[i - 1] + nums[i];
        }
    }

    sumRange(start, end) {
        if (start === 0) {
            return this.sums[end];
        }
        return this.sums[end] - this.sums[start - 1];
    }
}

let t = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(t.sumRange(0, 2) === 1);
console.log(t.sumRange(2, 5) === -1);
console.log(t.sumRange(0, 5) === -3);
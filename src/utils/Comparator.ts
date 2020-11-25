export type CompareFunction<T> = (a: T, b: T) => number;

export default class Comparator<T> {
  compare: CompareFunction<T>;

  constructor(compareFunction?: CompareFunction<T>) {
    this.compare = compareFunction || this.defaultCompareFunction;
  }

  defaultCompareFunction(a: T, b: T): number {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  equal(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }

  lessThan(a: T, b: T): boolean {
    return this.compare(a, b) < 0;
  }

  greaterThan(a: T, b: T): boolean {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a: T, b: T): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  greaterThanOrEqual(a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  reverse(): void {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}

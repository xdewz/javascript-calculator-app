export class Calculator {
  constructor(startingValue = 0) {
    this.value = startingValue;
  }
  add(number) {
    this.value += number;
    return this;
  }
  multiply(number) {
    this.value *= number;
    return this;
  }
  subtract(number) {
    this.value -= number;
    return this;
  }
  divide(number) {
    if (number === 0) {
      throw new Error('Cannot divide by zero');
    }
    this.value /= number;
    return this;
  }
  power(exponent) {
    this.value = Math.pow(this.value, exponent);
    return this;
  }
  sqrt() {
    if (this.value < 0) {
      throw new Error('Cannot take square root of negative number');
    }
    this.value = Math.sqrt(this.value);
    return this;
  }
  modulo(number) {
    if (number === 0) {
      throw new Error('Cannot modulo by zero');
    }
    this.value %= number;
    return this;
  }
  percentage() {
    this.value /= 100;
    return this;
  }
  negate() {
    this.value = -this.value;
    return this;
  }
  clear() {
    this.value = 0;
    return this;
  }
  reset(initialValue = 0) {
    this.value = initialValue;
    return this;
  }
  getResult() {
    return this.value;
  }
}

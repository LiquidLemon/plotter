import Parser from './Parser';

const BUILTINS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '^': (a, b) => Math.pow(a, b),
  'sin': Math.sin,
  'cos': Math.cos,
  'max': (a, b) => Math.max(a, b),
  'min': (a, b) => Math.min(a, b)
};

function getFunction(name) {
  return BUILTINS[name];
}

export default class Expression {
  constructor(input) {
    this.tokens = Parser.parse(input);
  }

  eval(env) {
    const stack = [];
    this.tokens.forEach(t => {
      if (t.type === 'REAL')  {
        stack.push(t.value);
      } else if (t.type === 'VAR') {
        const value = env[t.value];
        if (value !== null) {
          stack.push(value);
        } else {
          throw new Error(`'${t.value}' is undefined`);
        }
      } else if (t.type === 'OP' || t.type == 'FUNC') {
        const fn = getFunction(t.value);
        const args = stack.splice(-fn.length);
        const value = fn.apply(null, args);
        stack.push(value);
      }
    });
    return stack.pop();
  }
}

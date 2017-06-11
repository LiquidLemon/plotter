import Lexer from './Lexer';

const PRECENDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3
};

function precendence(token) {
  return token.type === 'FUNC'
    ? Infinity
    : PRECENDENCE[token.value];
}

const ASSOC = {
  '+': 'L',
  '-': 'L',
  '*': 'L',
  '/': 'L',
  '^': 'R'
};

function assoc(token) {
  return token.type === 'FUNC'
    ? 'R'
    : ASSOC[token.value];
}

const Parser = {
  parse(input) {
    const tokens = Lexer.lex(input);
    return this.convertToRPN(tokens);
  },

  convertToRPN(tokens) {
    const output = [];
    const ops = [];
    const arity = [];
    while (tokens.length > 0) {
      let token = tokens.shift();
      switch (token.type) {
        case 'REAL':
        case 'VAR':
          output.push(token);
          break;
        case 'FUNC':
          token.arity = 1;
          arity.push(token);
          ops.push(token);
          break;
        case 'OP':
          token.arity = 2;
          while (ops.length > 0) {
            let top = ops[ops.length-1];
            if ((assoc(token) === 'R' && precendence(top) > precendence(token)) ||
                (assoc(token) === 'L' && precendence(top) >= precendence(token))) {
              output.push(ops.pop());
            } else {
              break;
            }
          }
          ops.push(token);
          break;
        case 'LPAREN':
          if (ops.length > 0 && ops[ops.length-1].type !== 'FUNC') {
            arity.push({});
          }
          ops.push(token);
          break;
        case 'RPAREN':
          arity.pop();
          while (ops.length > 0 && ops[ops.length-1].type !== 'LPAREN') {
            output.push(ops.pop());
          }
          ops.pop();
          break;
        case 'SEPARATOR':
          arity[arity.length-1].arity++;
          while (ops.length > 0 && ops[ops.length-1].type !== 'LPAREN') {
            output.push(ops.pop());
          }
          break;
        default:
          throw new Error(`Unknown token type '${token.type}'`);
      }
    }

    while (ops.length !== 0) {
      output.push(ops.pop());
    }

    return output;
  }
};

export default Parser;

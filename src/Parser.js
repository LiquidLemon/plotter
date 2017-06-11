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
    ? 'L'
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
    while (tokens.length > 0) {
      let token = tokens.shift();
      switch (token.type) {
        case 'REAL':
        case 'VAR':
          output.push(token);
          break;
        case 'FUNC':
          ops.push(token);
          break;
        case 'OP':
          while (ops.length > 0) {
            let top = ops[ops.length-1];
            if (assoc(token) === 'R' && precendence(top) > precendence(token) ||
              assoc(token) === 'L' && precendence(top) >= precendence(token)) {
              output.push(ops.pop());
            } else {
              break;
            }
          }
          ops.push(token);
          break;
        case 'LPAREN':
          ops.push(token);
          break;
        case 'RPAREN':
          while (ops.length > 0 && ops[ops.length-1].type !== 'LPAREN') {
            output.push(ops.pop());
          }
          ops.pop();
          break;
        case 'SEPARATOR':
          while (ops.length > 0 && ops[ops.length-1].type !== 'LPAREN') {
            output.push(ops.pop());
          }
          break;
      }
    }

    while (ops.length != 0) {
      output.push(ops.pop());
    }

    return output;
  }
};

export default Parser;

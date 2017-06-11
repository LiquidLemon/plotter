class Rule {
  constructor(regex, type, transform) {
    this.regex = regex;
    this.type = type;
    this.transform = transform;
  }

  getToken(input) {
    let match = input.match(this.regex);
    if (match) {
      return {
        type: this.type,
        value: this.transform(match),
        length: match[0].length
      }
    } else {
      return null;
    }
  }
}

const Lexer = {
  rules: [
    new Rule(/^\d+\.\d+/, 'REAL', m => parseFloat(m)),
    new Rule(/^\d+/, 'REAL', m => parseInt(m, 10)),
    new Rule(/^\w+(?=\()/, 'FUNC', m => m[0]),
    new Rule(/^\w+/, 'VAR', m => m[0]),
    new Rule(/^\(/, 'LPAREN', m => null),
    new Rule(/^\)/, 'RPAREN', m => null),
    new Rule(/^,/, 'SEPARATOR', m => null),
    new Rule(/^[^\w\d]/, 'OP', m => m[0]),
  ],

  lex(input) {
    input = input.replace(/\s+/g, '');
    const expression = [];
    let i = 0;
    while (i < input.length) {
      let token = this.getToken(input.slice(i));
      if (!token) break;
      expression.push(token);
      i += token.length;
    }
    return expression;
  },

  getToken(input) {
    let token = null;
    this.rules.some(r => {
      return token = r.getToken(input);
    });
    return token;
  }
};

export default Lexer;

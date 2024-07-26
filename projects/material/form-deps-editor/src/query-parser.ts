const enum TokenType {
  END,

  Field,

  Equal,
  NotEqual,
  Less,
  LessOrEq,
  Greater,
  GreaterOrEq,

  Not,

  String,
  Number,
  Boolean,

  And,
  Or,

  Null,
  Error,
}

const operator = [
  {
    type: TokenType.Equal,
    qglOp: '$eq',
  },
  {
    type: TokenType.NotEqual,
    qglOp: '$ne',
  },
  {
    type: TokenType.Less,
    qglOp: '$lt',
  },
  {
    type: TokenType.LessOrEq,
    qglOp: '$lte',
  },
  {
    type: TokenType.Greater,
    qglOp: '$gt',
  },
  {
    type: TokenType.GreaterOrEq,
    qglOp: '$gte',
  },
];

interface Token {
  type: TokenType;
  text: string;
}

// firstToken returns the first token in s.
// s must not begin with whitespace characters.
function firstToken(s: string, availableFields: any): Token {
  if (s.length === 0) {
    return {type: TokenType.END, text: ''};
  }
  let m: RegExpMatchArray | null;
  const c = s.charAt(0);
  switch (c) {
    case '<':
      if (s.length > 1 && s.charAt(1) === '=') {
        return {type: TokenType.LessOrEq, text: '<='};
      }
      return {type: TokenType.Less, text: '<'};
    case '>':
      if (s.length > 1 && s.charAt(1) === '=') {
        return {type: TokenType.GreaterOrEq, text: '>='};
      }
      return {type: TokenType.Greater, text: '>'};
    case '=':
      if (s.length > 1 && s.charAt(1) === '=') {
        if (s.length > 2 && s.charAt(2) === '=') {
          return {type: TokenType.Equal, text: '==='};
        }
        return {type: TokenType.Equal, text: '=='};
      }
      return {type: TokenType.Equal, text: '='};
    case '!':
      if (s.length > 1 && s.charAt(1) === '=') {
        if (s.length > 2 && s.charAt(2) === '=') {
          return {type: TokenType.NotEqual, text: '!=='};
        }
        return {type: TokenType.NotEqual, text: '!='};
      }
      return {type: TokenType.Not, text: '!'};
    case '"':
      m = s.match(/^"(\\\\|\\"|[^"])*"/);
      if (m === null) {
        throw new Error('unterminated string literal in: ' + s);
      }
      return {type: TokenType.String, text: m[0]};
    case "'":
      m = s.match(/^'(\\\\|\\'|[^'])*'/);
      if (m === null) {
        throw new Error('unterminated string literal in: ' + s);
      }
      return {type: TokenType.String, text: m[0]};
    case '&':
      if (s.length > 1 && s.charAt(1) === '&') {
        return {type: TokenType.And, text: '&&'};
      }
      return {type: TokenType.And, text: '&'};
    case '|':
      if (s.length > 1 && s.charAt(1) === '|') {
        return {type: TokenType.Or, text: '||'};
      }
      return {type: TokenType.Or, text: '|'};
  }
  if (c >= '0' && c <= '9') {
    m = s.match(/^\d+(\.\d+)?([eE][\+\-]?\d+)?/);
    if (m === null) {
      throw new Error('impossible');
    }
    return {type: TokenType.Number, text: m[0]};
  }
  m = s.match(/^[a-zA-Z_]\w*(\.?\w+)*/);
  if (m !== null) {
    if (m[0].toLowerCase() === 'true' || m[0].toLowerCase() === 'false') {
      return {type: TokenType.Boolean, text: m[0].toLowerCase()};
    }
    if (m[0].toLowerCase() === 'null' || m[0].toLowerCase() === 'undefined') {
      return {type: TokenType.Null, text: m[0].toLowerCase()};
    }
    if (isValidField(m[0], availableFields)) {
      return {type: TokenType.Field, text: m[0]};
    }
  }
  if (s.match(/^\s/) !== null) {
    throw new Error('string s has a leading whitespace');
  }
  throw new Error('unrecognized token in: ' + s);
}

function tokenize(s: string, availableFields: any): Token[] {
  const toks: Token[] = [];
  try {
    while (true) {
      s = s.trim();
      const t = firstToken(s, availableFields);
      toks.push(t);
      if (t.type === TokenType.END) {
        return toks;
      }
      s = s.slice(t.text.length);
    }
  } catch (e) {
    return [{type: TokenType.Error, text: (e as any).message}];
  }
}

export function jsConditionToQuery(formula: string, availableFields: any): {[key: string]: any} {
  return parseExpression(tokenize(formula, availableFields).reverse(), TokenType.END);
}

function unexpectedTokenError(tok: Token, rest: Token[]): string {
  if (tok.type === TokenType.END) {
    return 'unexpected end of token stream';
  }
  rest.push(tok);
  return 'unexpected token: ' + printTokens(rest);
}

function printTokens(revToks: Token[]) {
  let s = '';
  while (revToks.length > 0) {
    const tok = revToks.pop() as Token;
    s += tok.text;
  }
  return s;
}

function isValidField(fieldName: string, availableFields: any): boolean {
  const fieldNameSplit = fieldName.split('.');
  if (fieldNameSplit.length > 1) {
    return Object.keys(availableFields).includes(fieldNameSplit[0]);
  }
  return Object.keys(availableFields).includes(fieldName);
}

/**
 *
 * @param tokType current token type
 * @param nextPermittedTypes next token types permitted
 * @param gqlFieldCondition current field condition
 * @returns true if token type is valid
 */
function isValidToken(
  tokType: TokenType,
  nextPermittedTypes: TokenType[],
  gqlFieldCondition: {[key: string]: any},
): boolean {
  if (nextPermittedTypes.length) {
    if (nextPermittedTypes.includes(tokType)) {
      if (gqlFieldCondition == null || Object.keys(gqlFieldCondition).length === 0) {
        return false;
      }
      return true;
    }
    return false;
  }
  return true;
}

function isMetricDataAttribute(fieldName: string): boolean {
  const fieldNameSplit = fieldName.split('.');
  if (fieldNameSplit.length > 1 && fieldNameSplit[0] === 'metric_data') {
    return true;
  }
  return false;
}

/** parseExpression parses the first js expression in revToks and returns its Query translation.
 * revToks is reversed, the first token of the expression being at index length-1;
 * this way, tokens can be consumed efficiently with revToks.pop().
 * After the expression, the function expects to find the token expectedEnd.
 * 
 * @param revToks 
 * @param expectedEnd 
 * @returns 
 * {
       is_deleted: {$eq: false}, 
       $or: [
        		{name: {$eq: "Pippo Dopo"}},
        		{name: {$eq: "Giuditta Caimi"}}
      ]}
 */
function parseExpression(revToks: Token[], expectedEnd: TokenType): {[key: string]: any} {
  if (expectedEnd !== TokenType.END) {
    return {error: 'invalid expectedEnd'};
  }
  if (revToks.length === 0 || revToks[0].type === TokenType.Error) {
    return {error: revToks[0].text};
  }

  let tokText: any = '';
  let gqlFieldCondition: {[key: string]: any} = {};
  let gqlLogicCondition: {[key: string]: {[key: string]: any}[]} = {};
  let fieldName: string = '';
  let conditionOp = null;
  let defaultConditionVal: any = null;
  let next: TokenType[] = [];
  while (true) {
    // Expression.
    let tok = revToks.pop() as Token;
    switch (tok.type) {
      case TokenType.Field:
        gqlFieldCondition = {};
        fieldName = tok.text;
        // fieldNameSplit = fieldName.split('.');
        /*if (fieldNameSplit.length > 1) {
          // i.e. {metric_data.metric_attribute1: {$eq: "attribute 1 val"}}
          gqlFieldCondition[fieldNameSplit[0]] = {_contains: {}};
          gqlFieldCondition[fieldNameSplit[0]]['_contains'][fieldNameSplit[1]] =
            defaultConditionVal;
          next = [TokenType.Equal];
        } else {*/
        // i.e. {name: {$eq: "Nome Cognome"}}
        gqlFieldCondition[fieldName] = {};
        next = [
          TokenType.Equal,
          TokenType.NotEqual,
          TokenType.Less,
          TokenType.LessOrEq,
          TokenType.Greater,
          TokenType.GreaterOrEq,
        ];
        //}
        break;
      case TokenType.Equal:
      case TokenType.NotEqual:
      case TokenType.Greater:
      case TokenType.GreaterOrEq:
      case TokenType.Less:
      case TokenType.LessOrEq:
        if (isValidToken(tok.type, next, gqlFieldCondition)) {
          //if (fieldNameSplit.length === 1) {
          const op = operator.find(o => o.type === tok.type);
          const gqlOp = op ? op.qglOp : '$eq';
          gqlFieldCondition[fieldName][gqlOp] = defaultConditionVal;
          //}
          next = [TokenType.String, TokenType.Number, TokenType.Boolean, TokenType.Null];
        } else {
          return {error: 'operator not allowed'};
        }
        break;
      case TokenType.String:
      case TokenType.Number:
      case TokenType.Boolean:
      case TokenType.Null:
        if (isValidToken(tok.type, next, gqlFieldCondition)) {
          tokText = tok.text;
          if (
            tok.type === TokenType.String &&
            (tok.text.startsWith('"') || tok.text.startsWith("'"))
          ) {
            tokText = tok.text.slice(1, -1);
          }
          if (tok.type === TokenType.Number && !isMetricDataAttribute(fieldName)) {
            tokText = +tok.text;
          }
          if (tok.type === TokenType.Boolean && !isMetricDataAttribute(fieldName)) {
            tokText = JSON.parse(tok.text);
          }
          if (tok.type === TokenType.Null) {
            tokText = tok.text === 'null' ? null : undefined;
          }
          if (gqlFieldCondition && Object.keys(gqlFieldCondition).length) {
            /*if (fieldNameSplit.length > 1) {
              gqlFieldCondition[fieldNameSplit[0]]['_contains'][fieldNameSplit[1]] = tokText;
            } else {*/
            conditionOp = Object.keys(gqlFieldCondition[fieldName])[0];
            gqlFieldCondition[fieldName][conditionOp] = tokText;
            //}
          }
          next = [];
        } else {
          return {error: 'Token with value not allowed in that position.'};
        }
        break;
      case TokenType.And:
        if ('$and' in gqlLogicCondition) {
          gqlLogicCondition['$and'] = [...gqlLogicCondition['$and'], gqlFieldCondition];
        } else if ('$or' in gqlLogicCondition) {
          return {error: 'use same operator in expression'};
        } else {
          gqlLogicCondition = {$and: [gqlFieldCondition]};
        }
        gqlFieldCondition = {};
        break;
      case TokenType.Or:
        if (gqlFieldCondition && Object.keys(gqlFieldCondition).length && next.length === 0) {
          if ('$or' in gqlLogicCondition) {
            gqlLogicCondition['$or'] = [...gqlLogicCondition['$or'], gqlFieldCondition];
          } else if ('$and' in gqlLogicCondition) {
            return {error: 'Use only one type of operator and/or in the formula.'};
          } else {
            gqlLogicCondition = {$or: [gqlFieldCondition]};
          }
          gqlFieldCondition = {};
        } else {
          return {error: 'Operators and/or not allowed in that position.'};
        }
        break;
      default:
        return {error: unexpectedTokenError(tok, revToks)};
    }

    // Possible end of expression. expectedEnd can be: END,
    // Note that we don't consume the end token.
    const type = revToks[revToks.length - 1].type;
    if (type === expectedEnd) {
      if (next.length > 0) {
        return {error: 'Missing operator or value'};
      }
      if (Object.keys(gqlLogicCondition).length) {
        gqlLogicCondition[Object.keys(gqlLogicCondition)[0]].push(gqlFieldCondition);
        return gqlLogicCondition;
      }
      return gqlFieldCondition;
    }
  }
}

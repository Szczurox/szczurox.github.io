export enum TokenType {
  NUMBER = 0,
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  MODULO,
  LPAREN,
  RPAREN,
  POW,
}

export class Token {
  type: TokenType;
  value: any = null;
  constructor(type: TokenType, value?: any) {
    this.type = type;
    this.value = value;
  }
}

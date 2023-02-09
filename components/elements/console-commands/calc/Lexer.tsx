import { Token, TokenType } from "./Token";

export function lexer(command: string) {
  let calculation: RegExpMatchArray | null = command
    .replace(/\s/g, "")
    .match(/[.\d]+|[^.\d]/g);
  let tokens: Token[] = [];

  // Check if calculation is not null
  if (!calculation) return "ERROR: calculation is null";

  for (var i = 0; i < calculation.length; i++) {
    if (calculation[i].split(".").length - 1 > 1)
      return `ERROR: too many decimal points in: ${calculation[i]}`;
    if (calculation[i].charAt(0) == ".") calculation[i] = "0" + calculation[i];

    if (!isNaN(+calculation[i])) {
      // Number
      tokens.push(new Token(TokenType.NUMBER, +calculation[i]));
    } else {
      switch (calculation[i]) {
        case "-":
          tokens.push(new Token(TokenType.MINUS));
          break;
        case "+":
          tokens.push(new Token(TokenType.PLUS));
          break;
        case "*":
          tokens.push(new Token(TokenType.MULTIPLY));
          break;
        case "/":
          tokens.push(new Token(TokenType.DIVIDE));
          break;
        case "%":
          tokens.push(new Token(TokenType.MODULO));
          break;
        case "^":
          tokens.push(new Token(TokenType.POW));
          break;
        case "(":
          tokens.push(new Token(TokenType.LPAREN));
          break;
        case ")":
          tokens.push(new Token(TokenType.RPAREN));
          break;
        default:
          // Invalid operator
          return `ERROR: Illegal character: ${command[i]} at position: ${i}`;
      }
    }
  }

  return tokens;
}

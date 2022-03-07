import { Token, TokenType } from "./token";
import { error, char_error } from "../errors";

export function lexer(command: string, commandResponse?: HTMLElement | null) {
  let calculation: RegExpMatchArray | null = command
    .replace(/\s/g, "")
    .match(/[.\d]+|[^.\d]/g);
  let tokens: Token[] = [];

  // Check if calculation is not null
  if (!calculation) return -1;

  for (var i = 0; i < calculation.length; i++) {
    if (calculation[i].split(".").length - 1 > 1)
      return error(
        `ERROR: too many decimal points in: ${calculation[i]}`,
        commandResponse
      );
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
        case "(":
          tokens.push(new Token(TokenType.LPAREN));
          break;
        case ")":
          tokens.push(new Token(TokenType.RPAREN));
          break;
        default:
          // Invalid operator
          return char_error(command[i], i, commandResponse);
      }
    }
  }
  return tokens;
}

import { lexer } from "./Lexer";
import { Token } from "./Token";
import { Parser } from "./Parser";
import { Interpreter } from "./Interpreter";

// Calc function from the previous szczczurox.github.io
export function calc(command: string) {
  var tokens: string | Token[] = lexer(command);
  if (typeof tokens === "string") return tokens;
  var mathTree = new Parser(tokens).parse();
  if (typeof mathTree === "string") return mathTree;
  var result = new Interpreter().visit(mathTree);
  return result;
}

import { lexer } from "./Lexer";
import { Token } from "./Token";
import { Parser } from "./Parser";
import { Interpreter } from "./Interpreter";
import { CommandResult } from "../Commands";

// Calc function from the previous szczczurox.github.io
export function calc(command: string) {
  var tokens: string | Token[] = lexer(command);
  if (typeof tokens === "string") return new CommandResult("", tokens);
  var mathTree = new Parser(tokens).parse();
  if (typeof mathTree === "string") return new CommandResult("", mathTree);
  var result = new Interpreter().visit(mathTree);
  return new CommandResult(result);
}

import { lexer } from "./lexer";
import { Token } from "./token";
import { Parser } from "./parser";
import { Interpreter } from "./interpreter";

export function calc(command: string, commandResponse?: HTMLElement | null) {
  var tokens: Token[] | number = lexer(command, commandResponse);
  if (typeof tokens === "number") return -1;
  var mathTree = new Parser(tokens).parse();
  console.log("calc > math tree: " + mathTree);
  var result = new Interpreter(commandResponse).visit(mathTree);
  console.log("calc > result: " + result);
  if (commandResponse) {
    commandResponse.innerText = result;
    document.getElementById("cmd")!.before(commandResponse);
  }
  return result;
}

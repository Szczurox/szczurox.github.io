import {
  AddNode,
  MultiplyNode,
  DivideNode,
  SubtractNode,
  ModuloNode,
  NumberNode,
  PlusNode,
  PowNode,
  MinusNode,
} from "./Nodes";
import { Token, TokenType } from "./Token";

// Creates node tree from given tokens
export class Parser {
  tokens: Token[];
  current_token: Token | null = null;
  current_token_number: number = 0;
  commandResponse?: HTMLElement | null = null;

  constructor(tokens: Token[], commandResponse?: HTMLElement | null) {
    this.tokens = tokens;
    this.commandResponse = commandResponse;
    this.current_token = tokens[this.current_token_number];
  }

  // Sets current node to the next node in tokens
  next_node() {
    this.current_token_number += 1;
    if (this.current_token_number < this.tokens.length) {
      this.current_token = this.tokens[this.current_token_number];
    } else {
      this.current_token = null;
    }
    return this.current_token;
  }

  // Entry point to the parser
  parse() {
    let result: any = this.expr();
    if (this.current_token != null) return "ERROR: Invalid syntax";
    return result;
  }

  expr() {
    let result: any = this.term();
    if (typeof result === "string") return result;
    while (
      this.current_token != null &&
      (this.current_token.type == TokenType.PLUS ||
        this.current_token.type == TokenType.MINUS)
    ) {
      if (this.current_token.type == TokenType.PLUS) {
        this.next_node();
        let newResult = this.term();
        if (typeof newResult === "string") return newResult;
        result = new AddNode(result, newResult);
      } else if (this.current_token.type == TokenType.MINUS) {
        this.next_node();
        let newResult = this.term();
        if (typeof newResult === "string") return newResult;
        result = new SubtractNode(result, newResult);
      }
    }
    return result;
  }

  term() {
    // Get first half of the node
    let result: any = this.term2();
    if (typeof result === "string") return result;
    while (
      this.current_token != null &&
      (this.current_token.type == TokenType.MULTIPLY ||
        this.current_token.type == TokenType.DIVIDE ||
        this.current_token.type == TokenType.MODULO)
    ) {
      if (this.current_token.type == TokenType.MULTIPLY) {
        // Multiply node
        this.next_node();
        let newResult = this.term2();
        if (newResult === "string") return newResult;
        result = new MultiplyNode(result, newResult);
      } else if (this.current_token.type == TokenType.DIVIDE) {
        // Divide node
        this.next_node();
        let newResult = this.term2();
        if (typeof newResult === "string") return newResult;
        result = new DivideNode(result, newResult);
      } else if (this.current_token.type == TokenType.MODULO) {
        // Divide node
        this.next_node();
        let newResult = this.term2();
        if (typeof newResult === "string") return newResult;
        result = new ModuloNode(result, newResult);
      }
    }
    return result;
  }

  term2() {
    let result: any = this.factor();
    if (typeof result === "string") return result;
    this.next_node();
    while (
      this.current_token != null &&
      this.current_token.type == TokenType.POW
    ) {
      if (this.current_token.type == TokenType.POW) {
        // Exponentation node
        this.next_node();
        let newResult = this.factor();
        if (typeof newResult === "string") return newResult;
        result = new PowNode(result, newResult);
        this.next_node();
      }
    }
    return result;
  }

  factor(): any {
    if (this.current_token == undefined) return "ERROR: Invalid syntax";
    if (this.current_token.type == TokenType.LPAREN) {
      // Had to do it this way because TS was throwing an error in RPAREN check
      this.current_token = this.next_node()!;
      var result = this.expr();

      if (this.current_token == null)
        return "ERROR: did not close a parenthesis";

      return result;
    }

    if (this.current_token.type == TokenType.NUMBER) {
      return new NumberNode(this.current_token.value);
    } else if (this.current_token.type == TokenType.PLUS) {
      this.next_node();
      let newResult = this.factor();
      if (typeof newResult === "string") return newResult;
      return new PlusNode(newResult);
    } else if (this.current_token.type == TokenType.MINUS) {
      this.next_node();
      let newResult = this.factor();
      if (typeof newResult === "string") return newResult;
      return new MinusNode(newResult);
    }
    return -1;
  }
}

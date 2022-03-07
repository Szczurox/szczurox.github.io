import {
  AddNode,
  MultiplyNode,
  DivideNode,
  SubtractNode,
  ModuloNode,
  NumberNode,
  PlusNode,
  MinusNode,
} from "./nodes";
import { Token, TokenType } from "./token";
import { error } from "../errors";

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
    if (this.current_token != null)
      error("ERROR: Invalid syntax", this.commandResponse);
    return result;
  }

  expr() {
    let result: any = this.term();
    while (
      this.current_token != null &&
      (this.current_token.type == TokenType.PLUS ||
        this.current_token.type == TokenType.MINUS)
    ) {
      if (this.current_token.type == TokenType.PLUS) {
        this.next_node();
        result = new AddNode(result, this.term());
      } else if (this.current_token.type == TokenType.MINUS) {
        this.next_node();
        result = new SubtractNode(result, this.term());
      }
    }
    return result;
  }

  term() {
    // Get first half of the node
    let result: any = this.factor();
    this.next_node();
    while (
      this.current_token != null &&
      (this.current_token.type == TokenType.MULTIPLY ||
        this.current_token.type == TokenType.DIVIDE ||
        this.current_token.type == TokenType.MODULO)
    ) {
      if (this.current_token.type == TokenType.MULTIPLY) {
        // Multiply node
        this.next_node();
        result = new MultiplyNode(result, this.factor());
        this.next_node();
      } else if (this.current_token.type == TokenType.DIVIDE) {
        // Divide node
        this.next_node();
        result = new DivideNode(result, this.factor());
        this.next_node();
      } else if (this.current_token.type == TokenType.MODULO) {
        // Divide node
        this.next_node();
        result = new ModuloNode(result, this.factor());
        this.next_node();
      }
    }
    return result;
  }

  factor(): any {
    if (!this.current_token)
      return error("ERROR: Invalid syntax", this.commandResponse);
    if (this.current_token.type == TokenType.LPAREN) {
      // Had to do it this way because TS was throwing an error in RPAREN check
      this.current_token = this.next_node()!;
      var result = this.expr();

      if (this.current_token.type != TokenType.RPAREN)
        return error(
          "ERROR: did not close a parenthesis",
          this.commandResponse
        );

      return result;
    }

    if (this.current_token.type == TokenType.NUMBER) {
      return new NumberNode(this.current_token.value);
    } else if (this.current_token.type == TokenType.PLUS) {
      this.next_node();
      return new PlusNode(this.factor());
    } else if (this.current_token.type == TokenType.MINUS) {
      this.next_node();
      return new MinusNode(this.factor());
    }
    return -1;
  }
}

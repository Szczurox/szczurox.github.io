export class Interpreter {
  visit(node: any) {
    switch (node.name) {
      case "number":
        return this.visit_number(node);
      case "add":
        return this.visit_add(node);
      case "subtract":
        return this.visit_subtract(node);
      case "multiply":
        return this.visit_multiply(node);
      case "divide":
        return this.visit_divide(node);
      case "plus":
        return this.visit_plus(node);
      case "minus":
        return this.visit_minus(node);
      case "modulo":
        return this.visit_modulo(node);
      case "pow":
        return this.visit_pow(node);
      default:
        return NaN;
    }
  }

  visit_number(node: any) {
    return node.value;
  }

  visit_add(node: any): any {
    return this.visit(node.node_a) + this.visit(node.node_b);
  }

  visit_subtract(node: any): any {
    return this.visit(node.node_a) - this.visit(node.node_b);
  }

  visit_multiply(node: any): any {
    return this.visit(node.node_a) * this.visit(node.node_b);
  }

  visit_divide(node: any): any {
    try {
      return this.visit(node.node_a) / this.visit(node.node_b);
    } catch (err) {
      return "ERROR: tried to divide by 0";
    }
  }

  visit_modulo(node: any): any {
    return this.visit(node.node_a) % this.visit(node.node_b);
  }

  visit_pow(node: any): any {
    return Math.pow(this.visit(node.node_a), this.visit(node.node_b));
  }

  visit_plus(node: any): any {
    return this.visit(node.node);
  }

  visit_minus(node: any): any {
    return -this.visit(node.node);
  }
}

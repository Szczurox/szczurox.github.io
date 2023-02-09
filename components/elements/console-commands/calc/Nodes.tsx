export class NumberNode {
  value: number;
  name: string = "number";

  constructor(value: number) {
    this.value = value;
  }
}

export class AddNode {
  node_a: any;
  node_b: any;
  name: string = "add";

  constructor(node_a: any, node_b: any) {
    this.node_a = node_a;
    this.node_b = node_b;
  }
}

export class SubtractNode {
  node_a: any;
  node_b: any;
  name: string = "subtract";

  constructor(node_a: any, node_b: any) {
    this.node_a = node_a;
    this.node_b = node_b;
  }
}

export class MultiplyNode {
  node_a: any;
  node_b: any;
  name: string = "multiply";

  constructor(node_a: any, node_b: any) {
    this.node_a = node_a;
    this.node_b = node_b;
  }
}

export class DivideNode {
  node_a: any;
  node_b: any;
  name: string = "divide";

  constructor(node_a: any, node_b: any) {
    this.node_a = node_a;
    this.node_b = node_b;
  }
}

export class ModuloNode {
  node_a: any;
  node_b: any;
  name: string = "modulo";

  constructor(node_a: any, node_b: any) {
    this.node_a = node_a;
    this.node_b = node_b;
  }
}

// Exponentation
export class PowNode {
  node_a: any;
  node_b: any;
  name: string = "pow";

  constructor(node_a: any, node_b: any) {
    this.node_a = node_a;
    this.node_b = node_b;
  }
}

export class MinusNode {
  node: any;
  name: string = "minus";

  constructor(node: any) {
    this.node = node;
  }
}

export class PlusNode {
  node: any;
  name: string = "plus";

  constructor(node: any) {
    this.node = node;
  }
}

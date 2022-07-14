import { Const, Prod, Som, Var } from "expr";
import { Print } from "visitors/Print";

describe('testing Print visitor', () => {
  let print: Print;

  beforeEach(() => {
    print = new Print();
  });

  test('Print Const 2', () => {
    const expr = new Const(2);
    expr.accept(print);
    expect(print.result).toBe("2");
  });

  test('Print Const -2', () => {
    const expr = new Const(-2);
    expr.accept(print);
    expect(print.result).toBe("-2");
  });

  test('Print Var x', () => {
    const expr = new Var('x');
    expr.accept(print);
    expect(print.result).toBe("x");
  });

  test('Print Var 2x^3', () => {
    const expr = new Var('x', 2, 3);
    expr.accept(print);
    expect(print.result).toBe("2x^3");
  });

  test('Print Var -x', () => {
    const expr = new Var('x', -1);
    expr.accept(print);
    expect(print.result).toBe("-x");
  });

  test('Print Var -2x', () => {
    const expr = new Var('x', -2);
    expr.accept(print);
    expect(print.result).toBe("-2x");
  });

  test('Print Som 2+2', () => {
    const expr = new Som([
      new Const(2),
      new Const(2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("2+2");
  });

  test('Print Som 3-2', () => {
    const expr = new Som([
      new Const(3),
      new Const(-2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("3-2");
  });

  test('Print Som x+2', () => {
    const expr = new Som([
      new Var('x'),
      new Const(2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("x+2");
  });

  test('Print Prod 2*2', () => {
    const expr = new Prod([
      new Const(2),
      new Const(2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("2*2");
  });

  test('Print Prod -2*x', () => {
    const expr = new Prod([
      new Const(-2),
      new Var('x')
    ]);
    expr.accept(print);
    expect(print.result).toBe("-2*x");
  });

  test('Print Prod (3*y)+(-2*x)', () => {
    const expr = new Som([
      new Prod([
        new Const(3),
        new Var('y')
      ]),
      new Prod([
        new Const(-2),
        new Var('x')
      ])
    ]);
    expr.accept(print);
    expect(print.result).toBe("(3*y)+(-2*x)");
  });

  test('Print Prod -2*(x+1)', () => {
    const expr = new Prod([
      new Const(-2),
      new Som([
        new Var('x'),
        new Const(1),
      ])
    ]);
    expr.accept(print);
    expect(print.result).toBe("-2*(x+1)");
  });

  test('Print Prod (x+1)*-2', () => {
    const expr = new Prod([
      new Som([
        new Var('x'),
        new Const(1),
      ]),
      new Const(-2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("(x+1)*-2");
  });

  test('Print Prod (x+1)*(x-1)', () => {
    const expr = new Prod([
      new Som([
        new Var('x'),
        new Const(1),
      ]),
      new Som([
        new Var('x'),
        new Const(-1),
      ])
    ]);
    expr.accept(print);
    expect(print.result).toBe("(x+1)*(x-1)");
  });

  test('Print Prod (x+1)+(x-1)', () => {
    const expr = new Som([
      new Som([
        new Var('x'),
        new Const(1),
      ]),
      new Som([
        new Var('x'),
        new Const(-1),
      ])
    ]);
    expr.accept(print);
    expect(print.result).toBe("(x+1)+(x-1)");
  });

  test('Print Som empty', () => {
    const expr = new Som([]);
    expr.accept(print);
    expect(print.result).toBe("");
  });

  test('Print Prod empty', () => {
    const expr = new Prod([]);
    expr.accept(print);
    expect(print.result).toBe("");
  });

  test('Print Som 1', () => {
    const expr = new Som([ new Const(1) ]);
    expr.accept(print);
    expect(print.result).toBe("1");
  });

  test('Print Som x', () => {
    const expr = new Som([ new Var('x') ]);
    expr.accept(print);
    expect(print.result).toBe("x");
  });

  test('Print Prod 1', () => {
    const expr = new Prod([ new Const(1) ]);
    expr.accept(print);
    expect(print.result).toBe("1");
  });

  test('Print Prod x', () => {
    const expr = new Prod([ new Var('x') ]);
    expr.accept(print);
    expect(print.result).toBe("x");
  });

});
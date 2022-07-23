import { Prod, Som, Term } from "expr";
import { Print } from "visitors/Print";

describe('testing Print visitor', () => {
  let print: Print;

  beforeEach(() => {
    print = new Print();
  });

  test('Print Const 2', () => {
    const expr = Term.const(2);
    expr.accept(print);
    expect(print.result).toBe("2");
  });

  test('Print Const -2', () => {
    const expr = Term.const(-2);
    expr.accept(print);
    expect(print.result).toBe("-2");
  });

  test('Print Const 0', () => {
    const expr = Term.const(0);
    expr.accept(print);
    expect(print.result).toBe("0");
  });

  test('Print Const 1', () => {
    const expr = Term.const(1);
    expr.accept(print);
    expect(print.result).toBe("1");
  });

  test('Print Term x', () => {
    const expr = Term.nVar(1, 'x');
    expr.accept(print);
    expect(print.result).toBe("x");
  });

  test('Print Term 2x^3', () => {
    const expr = new Term(2, 'x',3);
    expr.accept(print);
    expect(print.result).toBe("2x^3");
  });

  test('Print Term -x', () => {
    const expr = Term.nVar(-1, 'x');
    expr.accept(print);
    expect(print.result).toBe("-x");
  });

  test('Print Term -2x', () => {
    const expr = Term.nVar(-2, 'x');
    expr.accept(print);
    expect(print.result).toBe("-2x");
  });

  test('Print Som 2+2', () => {
    const expr = new Som([
      Term.const(2),
      Term.const(2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("2+2");
  });

  test('Print Som 3-2', () => {
    const expr = new Som([
      Term.const(3),
      Term.const(-2),
    ]);
    expr.accept(print);
    expect(print.result).toBe("3-2");
  });

  test('Print Som x+2', () => {
    const expr = new Som([
      Term.var('x'),
      Term.const(2),
    ]);
    expr.accept(print);
    expect(print.result).toBe("x+2");
  });

  test('Print Prod 2*2', () => {
    const expr = new Prod([
      Term.const(2),
      Term.const(2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("2*2");
  });

  test('Print Prod -2*x', () => {
    const expr = new Prod([
      Term.const(-2),
      Term.var('x')
    ]);
    expr.accept(print);
    expect(print.result).toBe("-2*x");
  });

  test('Print Prod (3*y)+(-2*x)', () => {
    const expr = new Som([
      new Prod([
        Term.const(3),
        Term.var('y')
      ]),
      new Prod([
        Term.const(-2),
        Term.var('x')
      ])
    ]);
    expr.accept(print);
    expect(print.result).toBe("(3*y)+(-2*x)");
  });

  test('Print Prod -2*(x+1)', () => {
    const expr = new Prod([
      Term.const(-2),
      new Som([
        Term.var('x'),
        Term.const(1),
      ])
    ]);
    expr.accept(print);
    expect(print.result).toBe("-2*(x+1)");
  });

  test('Print Prod (x+1)*-2', () => {
    const expr = new Prod([
      new Som([
        Term.var('x'),
        Term.const(1),
      ]),
      Term.const(-2),
    ]);
    expr.accept(print);
    expect(print.result).toBe("(x+1)*-2");
  });

  test('Print Prod (x+1)*(x-1)', () => {
    const expr = new Prod([
      new Som([
        Term.var('x'),
        Term.const(1),
      ]),
      new Som([
        Term.var('x'),
        Term.const(-1),
      ])
    ]);
    expr.accept(print);
    expect(print.result).toBe("(x+1)*(x-1)");
  });

  test('Print Prod (x+1)+(x-1)', () => {
    const expr = new Som([
      new Som([
        Term.var('x'),
        Term.const(1),
      ]),
      new Som([
        Term.var('x'),
        Term.const(-1),
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
    const expr = new Som([ Term.const(1), ]);
    expr.accept(print);
    expect(print.result).toBe("1");
  });

  test('Print Som x', () => {
    const expr = new Som([ Term.var('x') ]);
    expr.accept(print);
    expect(print.result).toBe("x");
  });

  test('Print Prod 1', () => {
    const expr = new Prod([ Term.const(1), ]);
    expr.accept(print);
    expect(print.result).toBe("1");
  });

  test('Print Prod x', () => {
    const expr = new Prod([ Term.var('x') ]);
    expr.accept(print);
    expect(print.result).toBe("x");
  });

});
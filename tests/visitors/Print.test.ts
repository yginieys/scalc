import { Const, Prod, Som, Var } from "expr";
import { Print } from "visitors/Print";

describe('testing Print visitor', () => {
  let print: Print;

  beforeEach(() => {
    print = new Print();
  });

  test('Print Const 2', () => {
    let expr = new Const(2);
    expr.accept(print);
    expect(print.result).toBe("2");
  });

  test('Print Const -2', () => {
    let expr = new Const(-2);
    expr.accept(print);
    expect(print.result).toBe("-2");
  });

  test('Print Var x', () => {
    let expr = new Var('x');
    expr.accept(print);
    expect(print.result).toBe("x");
  });

  test('Print Som 2+2', () => {
    let expr = new Som([
      new Const(2),
      new Const(2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("2+2");
  });

  test('Print Som 3-2', () => {
    let expr = new Som([
      new Const(3),
      new Const(-2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("3-2");
  });

  test('Print Som x+2', () => {
    let expr = new Som([
      new Var('x'),
      new Const(2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("x+2");
  });

  test('Print Prod 2*2', () => {
    let expr = new Prod([
      new Const(2),
      new Const(2)
    ]);
    expr.accept(print);
    expect(print.result).toBe("2*2");
  });

  test('Print Prod -2*x', () => {
    let expr = new Prod([
      new Const(-2),
      new Var('x')
    ]);
    expr.accept(print);
    expect(print.result).toBe("-2*x");
  });

  test('Print Prod 3*y-2*x', () => {
    let expr = new Som([
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
    expect(print.result).toBe("3*y-2*x");
  });

  test('Print Prod -2*(x+1)', () => {
    let expr = new Prod([
      new Const(-2),
      new Som([
        new Var('x'),
        new Const(1),
      ])
    ]);
    expr.accept(print);
    expect(print.result).toBe("-2*(x+1)");
  });

});
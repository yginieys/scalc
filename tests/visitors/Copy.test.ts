import { Prod, Som, Var } from "expr";
import { Copy } from "visitors/Copy";

describe('testing Copy visitor', () => {
  let copy: Copy;

  beforeEach(() => {
    copy = new Copy();
  });

  test('Copy Const 1', () => {
    const expr = Var.const(1);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Var x', () => {
    const expr = Var.var('x');
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Var -x^2', () => {
    const expr = new Var(-1, 'x', 2);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Som x+1', () => {
    const expr = new Som([
      Var.var('x'),
      Var.const(1)
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Prod x*2', () => {
    const expr = new Prod([
      Var.var('x'),
      Var.const(2)
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy (z+3)*((y+2)*(x+1))', () => {
    const expr = new Prod([
      new Som([
        Var.var('z'),
        Var.const(3)
      ]),
      new Prod([
        new Som([
          Var.var('y'),
          Var.const(2)
        ]),
        new Som([
          Var.var('x'),
          Var.const(1)
        ])
      ])
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })
});
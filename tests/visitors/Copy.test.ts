import { Const, Prod, Som, Var } from "expr";
import { Copy } from "visitors/Copy";

describe('testing Type visitor', () => {
  let copy: Copy;

  beforeEach(() => {
    copy = new Copy();
  });

  test('Copy Const 1', () => {
    const expr = new Const(1);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Var x', () => {
    const expr = new Var('x');
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Som x+1', () => {
    const expr = new Som([
      new Var('x'),
      new Const(1)
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Prod x*2', () => {
    const expr = new Prod([
      new Var('x'),
      new Const(2)
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy (z+3)*((y+2)*(x+1))', () => {
    const expr = new Prod([
      new Som([
        new Var('z'),
        new Const(3)
      ]),
      new Prod([
        new Som([
          new Var('y'),
          new Const(2)
        ]),
        new Som([
          new Var('x'),
          new Const(1)
        ])
      ])
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })
});
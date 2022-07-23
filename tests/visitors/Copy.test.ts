import { Prod, Som, Var } from "expr";
import { Copy } from "visitors/Copy";

describe('testing Copy visitor', () => {
  let copy: Copy;

  beforeEach(() => {
    copy = new Copy();
  });

  test('Copy Const 1', () => {
    const expr = new Var('CONST', 1, 0);
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

  test('Copy Var -x^2', () => {
    const expr = new Var('x', -1, 2);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Som x+1', () => {
    const expr = new Som([
      new Var('x'),
      new Var('CONST', 1, 0)
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Prod x*2', () => {
    const expr = new Prod([
      new Var('x'),
      new Var('CONST', 2, 0)
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
        new Var('CONST', 3, 0)
      ]),
      new Prod([
        new Som([
          new Var('y'),
          new Var('CONST', 2, 0)
        ]),
        new Som([
          new Var('x'),
          new Var('CONST', 1, 0)
        ])
      ])
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })
});
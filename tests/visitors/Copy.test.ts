import { Prod, Som, Term } from "expr";
import { Copy } from "visitors/Copy";

describe('testing Copy visitor', () => {
  let copy: Copy;

  beforeEach(() => {
    copy = new Copy();
  });

  test('Copy Const 1', () => {
    const expr = Term.const(1);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Term x', () => {
    const expr = Term.var('x');
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Term -x^2', () => {
    const expr = new Term(-1, 'x', 2);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Som x+1', () => {
    const expr = new Som([
      Term.var('x'),
      Term.const(1)
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy Prod x*2', () => {
    const expr = new Prod([
      Term.var('x'),
      Term.const(2)
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })

  test('Copy (z+3)*((y+2)*(x+1))', () => {
    const expr = new Prod([
      new Som([
        Term.var('z'),
        Term.const(3)
      ]),
      new Prod([
        new Som([
          Term.var('y'),
          Term.const(2)
        ]),
        new Som([
          Term.var('x'),
          Term.const(1)
        ])
      ])
    ]);
    expr.accept(copy);
    const expr2 = copy.result;

    expect(expr2).toEqual(expr);
    expect(expr2).not.toBe(expr);
  })
});
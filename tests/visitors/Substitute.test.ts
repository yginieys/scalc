import { Const, Expr, Prod, Som, Var } from "expr";
import { Copy } from "visitors/Copy";
import { Print } from "visitors/Print";
import { Substitute } from "visitors/Substitute";

describe('testing Type visitor', () => {

  test('Substitute x by y in 1', () => {
    const subst = new Substitute('x', new Var('y'));
    const expr = new Const(1);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '1');
  })

  test('Substitute x by y in x', () => {
    const subst = new Substitute('x', new Var('y'));
    const expr = new Var('y');
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, 'y');
  })

  test('Substitute x by y+1 in x*y', () => {
    const subst = new Substitute('x', new Som([new Var('y'), new Const(1)]));
    const expr = new Prod([new Var('x'), new Var('y')]);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '(y+1)*y');
  })

  test('Substitute x by 1 in 2+x', () => {
    const subst = new Substitute('x', new Const(1));
    const expr = new Som([new Const(2), new Var('x')]);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2+1');
  })

  test('Substitute x by 1 in (2+x)*x', () => {
    const subst = new Substitute('x', new Const(1));
    const expr = new Prod([
      new Som([new Const(2), new Var('x')]),
      new Var('x')
    ]);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '(2+1)*1');
  })


  function assertExprIs(expr: Expr|null, expected: string) {
    if(expr == null) {
      expect(expr).not.toBeNull(); // Should never happen
      return;
    }
    const print = new Print();
    expr.accept(print);
    expect(print.result).toBe(expected);
  }
})
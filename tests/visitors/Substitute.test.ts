import { Expr, Prod, Som, Var } from "expr";
import { Copy } from "visitors/Copy";
import { Print } from "visitors/Print";
import { Substitute } from "visitors/Substitute";

describe('testing Substitute visitor', () => {

  test('Substitute x by y in 1', () => {
    const subst = new Substitute('x', new Var('y'));
    const expr = new Var('CONST', 1, 0);
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

  test('Substitute x by y in 2x^3', () => {
    const subst = new Substitute('x', new Var('y'));
    const expr = new Var('x', 2, 3);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2y^3');
  })

  test('Substitute x by 4y^2 in 2x^3', () => {
    const subst = new Substitute('x', new Var('y', 4, 2));
    const expr = new Var('x', 2, 3);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '8y^6');
  })

  test('Substitute x by y in 2x^0', () => {
    const subst = new Substitute('x', new Var('y'));
    const expr = new Var('x', 2, 0);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2');
  })

  test('Substitute x by y+1 in 2x^0', () => {
    const subst = new Substitute('x', new Som([new Var('y'), new Var('CONST', 1, 0)]));
    const expr = new Var('x', 2, 0);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2');
  })

  test('Substitute x by y+1 in x^3', () => {
    const subst = new Substitute('x', new Som([new Var('y'), new Var('CONST', 1, 0)]));
    const expr = new Var('x', 1, 3);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '(y+1)*(y+1)*(y+1)');
  })

  test('Substitute x by y+1 in x*y', () => {
    const subst = new Substitute('x', new Som([new Var('y'), new Var('CONST', 1, 0)]));
    const expr = new Prod([new Var('x'), new Var('y')]);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '(y+1)*y');
  })

  test('Substitute x by 1 in 2+x', () => {
    const subst = new Substitute('x', new Var('CONST', 1, 0));
    const expr = new Som([new Var('CONST', 2, 0), new Var('x')]);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2+1');
  })

  test('Substitute x by 1 in (2+x)*x', () => {
    const subst = new Substitute('x', new Var('CONST', 1, 0));
    const expr = new Prod([
      new Som([new Var('CONST', 2, 0), new Var('x')]),
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
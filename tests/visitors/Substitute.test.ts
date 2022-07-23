import { Expr, Prod, Som, Term } from "expr";
import { Copy } from "visitors/Copy";
import { Print } from "visitors/Print";
import { Substitute } from "visitors/Substitute";

describe('testing Substitute visitor', () => {

  test('Substitute x by y in 1', () => {
    const subst = new Substitute('x', Term.var('y'));
    const expr = Term.const(1);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '1');
  })

  test('Substitute x by y in x', () => {
    const subst = new Substitute('x', Term.var('y'));
    const expr = Term.var('y');
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, 'y');
  })

  test('Substitute x by y in 2x^3', () => {
    const subst = new Substitute('x', Term.var('y'));
    const expr = new Term(2, 'x', 3);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2y^3');
  })

  test('Substitute x by 4y^2 in 2x^3', () => {
    const subst = new Substitute('x', new Term(4, 'y', 2));
    const expr = new Term(2, 'x', 3);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '8y^6');
  })

  test('Substitute x by y in 2x^0', () => {
    const subst = new Substitute('x', Term.var('y'));
    const expr = new Term(2, 'x', 0);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2');
  })

  test('Substitute x by y+1 in 2x^0', () => {
    const subst = new Substitute('x', new Som([Term.var('y'), Term.const(1)]));
    const expr = new Term(2, 'x', 0);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2');
  })

  test('Substitute x by y+1 in x^3', () => {
    const subst = new Substitute('x', new Som([Term.var('y'), Term.const(1)]));
    const expr = new Term(1, 'x', 3);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '(y+1)*(y+1)*(y+1)');
  })

  test('Substitute x by y+1 in x*y', () => {
    const subst = new Substitute('x', new Som([Term.var('y'), Term.const(1)]));
    const expr = new Prod([Term.var('x'), Term.var('y')]);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '(y+1)*y');
  })

  test('Substitute x by 1 in 2+x', () => {
    const subst = new Substitute('x', Term.const(1));
    const expr = new Som([Term.const(2), Term.var('x')]);
    expr.accept(subst);
    const result = subst.result;
    
    assertExprIs(result, '2+1');
  })

  test('Substitute x by 1 in (2+x)*x', () => {
    const subst = new Substitute('x', Term.const(1));
    const expr = new Prod([
      new Som([Term.const(2), Term.var('x')]),
      Term.var('x')
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
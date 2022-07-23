import { Expr, Prod, Som, Term } from "expr";
import { Normalize } from "visitors/Normalize";
import { Print } from "visitors/Print";

describe('testing Normalize visitor', () => {
  let normalize: Normalize;

  beforeEach(() => {
    normalize = new Normalize();
  });

  test('Normalize Const 1', () => {
    const expr = Term.const(1);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '1');
  })

  test('Normalize Term 2x^3', () => {
    const expr = new Term(2, 'x', 3);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '2*x^3');
  })

  test('Normalize Prod 2*2', () => {
    const expr = new Prod([Term.const(2), Term.const(2)]);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '4');
  })

  test('Normalize Prod 2x*2', () => {
    const expr = new Prod([Term.nVar(2, 'x'), Term.const(2)]);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '4*x');
  })

  test('Normalize Prod x*2x', () => {
    const expr = new Prod([Term.var('x'), Term.nVar(2, 'x')]);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '2*x^2');
  })

  test('Normalize Prod 2x*2x^3', () => {
    const expr = new Prod([Term.nVar(2, 'x'), new Term(2, 'x', 3)]);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '4*x^4');
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
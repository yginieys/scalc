import { Expr, Prod, Som, Var } from "expr";
import { Normalize } from "visitors/Normalize";
import { Print } from "visitors/Print";

describe('testing Normalize visitor', () => {
  let normalize: Normalize;

  beforeEach(() => {
    normalize = new Normalize();
  });

  test('Normalize Const 1', () => {
    const expr = new Var('CONST', 1, 0);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '1');
  })

  test('Normalize Var 2x^3', () => {
    const expr = new Var('x', 2, 3);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '2*x^3');
  })

  test('Normalize Prod 2*2', () => {
    const expr = new Prod([new Var('CONST', 2, 0), new Var('CONST', 2, 0)]);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '4');
  })

  test('Normalize Prod 2x*2', () => {
    const expr = new Prod([new Var('x', 2), new Var('CONST', 2, 0)]);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '4*x');
  })

  test('Normalize Prod x*2x', () => {
    const expr = new Prod([new Var('x'), new Var('x', 2)]);
    expr.accept(normalize);
    const result = normalize.result;
    
    assertExprIs(result, '2*x^2');
  })

  test('Normalize Prod 2x*2x^3', () => {
    const expr = new Prod([new Var('x', 2), new Var('x', 2, 3)]);
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
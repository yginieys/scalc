import { Expr, Prod, Som, Var } from "expr";
import { Multiply } from "visitors/Multiply";
import { Print } from "visitors/Print";

describe('testing Multiply visitor', () => {
  let mult: Multiply;
  
  beforeEach(() => {
    mult = new Multiply();
  });

  test('Multiply 1', () => {
    const one = new Var('CONST', 1, 0);
    mult.push(one);
    const result = mult.eval();
    
    assertExprIs(result, '');  // Vide accepté car element neutre
  })

  test('Multiply 2 * 3', () => {
    mult.push(new Var('CONST', 2, 0));
    mult.push(new Var('CONST', 3, 0));
    const result = mult.eval();
    
    assertExprIs(result, '6');
  })

  test('Multiply x * 3', () => {
    mult.push(new Var('x'));
    mult.push(new Var('CONST', 3, 0));
    const result = mult.eval();
    
    assertExprIs(result, '3*x');
  })

  test('Multiply x * 3 * 2x', () => {
    mult.push(new Var('x'));
    mult.push(new Var('CONST', 3, 0));
    mult.push(new Var('x', 2));
    const result = mult.eval();
    
    assertExprIs(result, '6*x^2');
  })

  test('Multiply x * (3+2x)', () => {
    mult.push(new Var('x'));
    mult.push(new Som([
      new Var('CONST', 3, 0),
      new Var('x', 2)
    ]));
    const result = mult.eval();
    
    assertExprIs(result, 'x*(3+2x)');
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
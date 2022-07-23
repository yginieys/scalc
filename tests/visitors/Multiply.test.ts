import { Expr, Prod, Som, Term } from "expr";
import { Multiply } from "visitors/Multiply";
import { Print } from "visitors/Print";

describe('testing Multiply visitor', () => {
  let mult: Multiply;
  
  beforeEach(() => {
    mult = new Multiply();
  });

  test('Multiply 1', () => {
    const one = Term.const(1);
    mult.push(one);
    const result = mult.eval();
    
    assertExprIs(result, '');  // Vide accepté car element neutre
  })

  test('Multiply 2 * 3', () => {
    mult.push(Term.const(2));
    mult.push(Term.const(3));
    const result = mult.eval();
    
    assertExprIs(result, '6');
  })

  test('Multiply x * 3', () => {
    mult.push(Term.var('x'));
    mult.push(Term.const(3));
    const result = mult.eval();
    
    assertExprIs(result, '3*x');
  })

  test('Multiply x * 3 * 2x', () => {
    mult.push(Term.var('x'));
    mult.push(Term.const(3));
    mult.push(Term.nVar(2, 'x'));
    const result = mult.eval();
    
    assertExprIs(result, '6*x^2');
  })

  test('Multiply x * (3+2x)', () => {
    mult.push(Term.var('x'));
    mult.push(new Som([
      Term.const(3),
      Term.nVar(2, 'x')
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
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

  test('Multiply 2', () => {
    const term = Term.const(2);
    mult.push(term);
    const result = mult.eval();
    
    assertExprIs(result, '2');  // Vide accepté car element neutre
  })

  test('Multiply x', () => {
    const term = Term.var('x');
    mult.push(term);
    const result = mult.eval();
    
    assertExprIs(result, 'x'); 
  })

  test('Multiply 1*x', () => {
    mult.push(Term.const(1));
    mult.push(Term.var('x'));
    const result = mult.eval();
    
    assertExprIs(result, 'x');
  })

  test('Multiply 2x', () => {
    const term = Term.nVar(2, 'x');
    mult.push(term);
    let result = mult.eval();
    assertExprIs(result, '2*x');

    mult = new Multiply({ extractConst: false });
    mult.push(term);
    result = mult.eval();
    assertExprIs(result, '2x');
  })

  test('Multiply x*2', () => {
    const term = new Prod([Term.var('x'), Term.const(2)]);
    mult.push(term);
    let result = mult.eval();
    assertExprIs(result, '2*x');

    mult = new Multiply({ extractConst: false });
    mult.push(term);
    result = mult.eval();
    assertExprIs(result, '2x');
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
    
    assertExprIs(result, '2*x^2+3*x');
    //assertExprIs(result, 'x*(3+2x)');
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
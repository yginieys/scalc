import { Expr, Prod, Term } from "expr";
import { Add } from "visitors/Add";
import { Print } from "visitors/Print";

describe('testing Add visitor', () => {
  let add: Add;
  
  beforeEach(() => {
    add = new Add();
  });

  test('Add 1', () => {
    const one = Term.const(1);
    add.push(one);
    const result = add.eval();
    
    assertExprIs(result, '1');
  })

  test('Add 1+2 ', () => {
    const one = Term.const(1);
    const two = Term.const(2);
    add.push(one);
    add.push(two);
    const result = add.eval();
    
    assertExprIs(result, '3');
  })

  test('Add 1+x ', () => {
    const one = Term.const(1);
    const x = Term.var('x');
    add.push(one);
    add.push(x);
    const result = add.eval();
    
    assertExprIs(result, 'x+1');
  })

  test('Add 2x+1+x ', () => {
    add.push(Term.nVar(2, 'x'));
    add.push(Term.const(1));
    add.push(Term.var('x'));
    const result = add.eval();
    
    assertExprIs(result, '3x+1');
  })

  test('Add 2x^2 + x + x^2', () => {
    add.push(new Term(2, 'x', 2));
    add.push(new Term(1, 'x', 1));
    add.push(new Term(1, 'x', 2));
    const result = add.eval();
    
    assertExprIs(result, '3x^2+x');
  })

  test('Add 2y + x + y', () => {
    add.push(Term.nVar(2, 'y'));
    add.push(Term.nVar(1, 'x'));
    add.push(Term.nVar(1, 'y'));
    const result = add.eval();
    
    assertExprIs(result, 'x+3y');
  })

  test('Add 2x + 2*x', () => {
    add.push(Term.nVar(2, 'x'));
    add.push(new Prod([
      Term.const(2),
      Term.var('x')
    ]));
    const result = add.eval();
    
    assertExprIs(result, '4x');
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
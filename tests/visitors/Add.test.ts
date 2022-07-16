import { Const, Expr, Prod, Var } from "expr";
import { Add } from "visitors/Add";
import { Print } from "visitors/Print";

describe('testing Add visitor', () => {
  let add: Add;
  
  beforeEach(() => {
    add = new Add();
  });

  test('Add 1', () => {
    const one = new Const(1);
    add.push(one);
    const result = add.eval();
    
    assertExprIs(result, '1');
  })

  test('Add 1+2 ', () => {
    const one = new Const(1);
    const two = new Const(2);
    add.push(one);
    add.push(two);
    const result = add.eval();
    
    assertExprIs(result, '3');
  })

  test('Add 1+x ', () => {
    const one = new Const(1);
    const x = new Var('x');
    add.push(one);
    add.push(x);
    const result = add.eval();
    
    assertExprIs(result, 'x+1');
  })

  test('Add 2x+1+x ', () => {
    add.push(new Var('x', 2));
    add.push(new Const(1));
    add.push(new Var('x'));
    const result = add.eval();
    
    assertExprIs(result, '3x+1');
  })

  test('Add 2x^2 + x + x^2', () => {
    add.push(new Var('x', 2, 2));
    add.push(new Var('x'));
    add.push(new Var('x', 1, 2));
    const result = add.eval();
    
    assertExprIs(result, '3x^2+x');
  })

  test('Add 2y + x + y', () => {
    add.push(new Var('y', 2));
    add.push(new Var('x'));
    add.push(new Var('y'));
    const result = add.eval();
    
    assertExprIs(result, 'x+3y');
  })

  test('Add 2x + 2*x', () => {
    add.push(new Var('x', 2));
    add.push(new Prod([
      new Const(2),
      new Var('x')
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
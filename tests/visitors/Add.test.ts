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
    add.add(one);
    const result = add.result;
    
    assertExprIs(result, '1');
  })

  test('Add 1+2 ', () => {
    const one = new Const(1);
    const two = new Const(2);
    add.add(one);
    add.add(two);
    const result = add.result;
    
    assertExprIs(result, '3');
  })

  test('Add 1+x ', () => {
    const one = new Const(1);
    const x = new Var('x');
    add.add(one);
    add.add(x);
    const result = add.result;
    
    assertExprIs(result, 'x+1');
  })

  test('Add 2x+1+x ', () => {
    add.add(new Var('x', 2));
    add.add(new Const(1));
    add.add(new Var('x'));
    const result = add.result;
    
    assertExprIs(result, '3x+1');
  })

  test('Add 2x^2 + x + x^2', () => {
    add.add(new Var('x', 2, 2));
    add.add(new Var('x'));
    add.add(new Var('x', 1, 2));
    const result = add.result;
    
    assertExprIs(result, '3x^2+x');
  })

  test('Add 2y + x + y', () => {
    add.add(new Var('y', 2));
    add.add(new Var('x'));
    add.add(new Var('y'));
    const result = add.result;
    
    assertExprIs(result, 'x+3y');
  })

  test('Add 2x + 2*x', () => {
    add.add(new Var('x', 2));
    add.add(new Prod([
      new Const(2),
      new Var('x')
    ]));
    const result = add.result;
    
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
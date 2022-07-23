import { Expr, Prod, Var } from "expr";
import { Add } from "visitors/Add";
import { Print } from "visitors/Print";

describe('testing Add visitor', () => {
  let add: Add;
  
  beforeEach(() => {
    add = new Add();
  });

  test('Add 1', () => {
    const one = Var.const(1);
    add.push(one);
    const result = add.eval();
    
    assertExprIs(result, '1');
  })

  test('Add 1+2 ', () => {
    const one = Var.const(1);
    const two = Var.const(2);
    add.push(one);
    add.push(two);
    const result = add.eval();
    
    assertExprIs(result, '3');
  })

  test('Add 1+x ', () => {
    const one = Var.const(1);
    const x = Var.var('x');
    add.push(one);
    add.push(x);
    const result = add.eval();
    
    assertExprIs(result, 'x+1');
  })

  test('Add 2x+1+x ', () => {
    add.push(Var.nVar(2, 'x'));
    add.push(Var.const(1));
    add.push(Var.var('x'));
    const result = add.eval();
    
    assertExprIs(result, '3x+1');
  })

  test('Add 2x^2 + x + x^2', () => {
    add.push(new Var(2, 'x', 2));
    add.push(new Var(1, 'x', 1));
    add.push(new Var(1, 'x', 2));
    const result = add.eval();
    
    assertExprIs(result, '3x^2+x');
  })

  test('Add 2y + x + y', () => {
    add.push(Var.nVar(2, 'y'));
    add.push(Var.nVar(1, 'x'));
    add.push(Var.nVar(1, 'y'));
    const result = add.eval();
    
    assertExprIs(result, 'x+3y');
  })

  test('Add 2x + 2*x', () => {
    add.push(Var.nVar(2, 'x'));
    add.push(new Prod([
      Var.const(2),
      Var.var('x')
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
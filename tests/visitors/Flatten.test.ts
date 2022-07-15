import { Const, Expr, Prod, Som, Var } from "expr";
import { Flatten } from "visitors/Flatten";
import { Print } from "visitors/Print";

describe('testing Flatten visitor', () => {
  let flatten: Flatten;

  beforeEach(() => {
    flatten = new Flatten();
  });

  test('Flatten Const 1', () => {
    const expr = new Const(1);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1');
  })

  test('Flatten Var 2x^3', () => {
    const expr = new Var('x', 2, 3);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '2x^3');
  })

  test('Flatten Prod empty', () => {
    const expr = new Prod([]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '');
  })

  test('Flatten Prod 1', () => {
    const expr = new Prod([ new Const(1) ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1');
  })

  test('Flatten Prod x', () => {
    const expr = new Prod([ new Var('x') ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, 'x');
  })

  test('Flatten Prod Prod x', () => {
    const expr = new Prod([new Prod([ new Var('x') ])]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, 'x');
  })

  test('Flatten Prod (1*2x)*(2*3x)', () => {
    const expr = new Prod([ 
      new Prod([ new Const(1), new Var('x', 2) ]),
      new Prod([ new Const(2), new Var('x', 3) ]),
    ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1*2x*2*3x');
  })

  test('Flatten Prod 1*2x*(2*3x)', () => {
    const expr = new Prod([ 
      new Const(1), 
      new Var('x', 2),
      new Prod([ new Const(2), new Var('x', 3) ])
    ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1*2x*2*3x');
  })

  test('Flatten Som empty', () => {
    const expr = new Som([ ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '');
  })

  test('Flatten Som 1', () => {
    const expr = new Som([ new Const(1) ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1');
  })

  test('Flatten Som x', () => {
    const expr = new Som([ new Var('x') ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, 'x');
  })

  test('Flatten Som Som x', () => {
    const expr = new Som([new Som([ new Var('x') ])]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, 'x');
  })

  test('Flatten Som (1+2x)+(2+3x)', () => {
    const expr = new Som([ 
      new Som([ new Const(1), new Var('x', 2) ]),
      new Som([ new Const(2), new Var('x', 3) ]),
    ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1+2x+2+3x');
  })

  test('Flatten Som 1+2x+(2+3x)', () => {
    const expr = new Som([ 
      new Const(1), 
      new Var('x', 2),
      new Som([ new Const(2), new Var('x', 3) ])
    ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1+2x+2+3x');
  })

  test('Flatten Prod with Som 1*(2+3x)*2x', () => {
    const expr = new Prod([ 
      new Const(1), 
      new Som([ new Const(2), new Var('x', 3) ]),
      new Var('x', 2)
    ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1*(2+3x)*2x');
  })

  test('Flatten Som with Prod 1+(2*3x)+2x', () => {
    const expr = new Som([ 
      new Const(1), 
      new Prod([ new Const(2), new Var('x', 3) ]),
      new Var('x', 2)
    ]);
    expr.accept(flatten);
    const result = flatten.result;
    
    assertExprIs(result, '1+(2*3x)+2x');
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
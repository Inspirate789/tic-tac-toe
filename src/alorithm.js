export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function tryWin(line, symb) {
  if (line.filter(x => x === symb).length == line.length - 1) {
    const index = line.findIndex(x => x === null);
    if (index !== -1) {
      return index;
    }
  }
  return null;
}

function tryEscape(line, antisymb) {
  if (line.filter(x => x === antisymb).length == line.length - 1) {
    const index = line.findIndex(x => x === null);
    if (index !== -1) {
      return index;
    }
  }
  return null;
}

function processRows(squares, fieldSize, symb, func) {
  for (let i = 0; i < fieldSize; i++) {
    let line = squares.slice(fieldSize * i, fieldSize * (i + 1));
    let index = func(line, symb);
    if (index !== null) {
      return fieldSize * i + index;
    }
  }
  return null;
}

function processColumns(squares, fieldSize, symb, func) {
  for (let j = 0; j < fieldSize; j++) {
    let line = [];
    for (let i = 0; i < fieldSize; i++) {
      line.push(squares[fieldSize * i + j]);
    }
    let index = func(line, symb);
    if (index !== null) {
      return fieldSize * index + j;
    }
  }
  return null;
}

function processMainDiagonal(squares, fieldSize, symb, func) {
  let line = [];
  for (let i = 0; i < fieldSize; i++) {
    line.push(squares[fieldSize * i + i]);
  }
  let index = func(line, symb);
  if (index !== null) {
    return fieldSize * index + index;
  }
  return null;
}

function processSideDiagonal(squares, fieldSize, symb, func) {
  let line = [];
  for (let i = 0; i < fieldSize; i++) {
    line.push(squares[fieldSize * i + fieldSize - i - 1]);
  }
  let index = func(line, symb);
  if (index !== null) {
    return fieldSize * index + fieldSize - index - 1;
  }
  return null;
}

function processLines(squares, fieldSize, symb, func) {
  let index = processRows(squares, fieldSize, symb, func);
  if (index !== null) {
    return index;
  }

  index = processColumns(squares, fieldSize, symb, func);
  if (index !== null) {
    return index;
  }

  index = processMainDiagonal(squares, fieldSize, symb, func);
  if (index !== null) {
    return index;
  }

  return processSideDiagonal(squares, fieldSize, symb, func);
}

function processCorners(squares, fieldSize, symb) {
  if (squares[squares.length - 1] === null && squares[0] === symb) {
    return (fieldSize - 1) * fieldSize + fieldSize - 1;
  }

  if (squares[0] === null && squares[squares.length - 1] === symb) {
    return 0;
  }

  if (squares[(fieldSize - 1) * fieldSize] === null &&
      squares[fieldSize - 1] === symb) {
    return (fieldSize - 1) * fieldSize;
  }

  if (squares[fieldSize - 1] === null && 
      squares[(fieldSize - 1) * fieldSize] === symb) {
    return fieldSize - 1;
  }

  return null;
}

function processEmptyCorners(squares, fieldSize) {
  if (squares[squares.length - 1] === null) {
    return (fieldSize - 1) * fieldSize + fieldSize - 1;
  }

  if (squares[0] === null) {
    return 0;
  }

  if (squares[(fieldSize - 1) * fieldSize] === null) {
    return (fieldSize - 1) * fieldSize;
  }

  if (squares[fieldSize - 1] === null) {
    return fieldSize - 1;
  }

  return null;
}

function processSides(squares, fieldSize, symb) {
  let i = 0;
  for (let j = 1; j < fieldSize - 1; j++) {
    if (squares[fieldSize * i + j] === null && (squares[fieldSize * i + j - 1] === symb ||
                                                squares[fieldSize * i + j + 1] === symb ||
                                                squares[fieldSize * (i + 1) + j - 1] === symb ||
                                                squares[fieldSize * (i + 1) + j] === symb ||
                                                squares[fieldSize * (i + 1) + j + 1] === symb)) {
      return fieldSize * i + j;
    }
  }

  i = fieldSize - 1;
  for (let j = 1; j < fieldSize - 1; j++) {
    if (squares[fieldSize * i + j] === null && (squares[fieldSize * i + j - 1] === symb ||
                                                squares[fieldSize * i + j + 1] === symb ||
                                                squares[fieldSize * (i - 1) + j - 1] === symb ||
                                                squares[fieldSize * (i - 1) + j] === symb ||
                                                squares[fieldSize * (i - 1) + j + 1] === symb)) {
      return fieldSize * i + j;
    }
  }

  let j = 0;
  for (let i = 1; i < fieldSize - 1; i++) {
    if (squares[fieldSize * i + j] === null && (squares[fieldSize * (i + 1) + j] === symb ||
                                                squares[fieldSize * (i - 1) + j] === symb ||
                                                squares[fieldSize * (i - 1) + j + 1] === symb ||
                                                squares[fieldSize * i + j + 1] === symb ||
                                                squares[fieldSize * (i + 1) + j + 1] === symb)) {
      return fieldSize * i + j;
    }
  }

  j = fieldSize - 1;
  for (let i = 1; i < fieldSize - 1; i++) {
    if (squares[fieldSize * i + j] === null && (squares[fieldSize * (i + 1) + j] === symb ||
                                                squares[fieldSize * (i - 1) + j] === symb ||
                                                squares[fieldSize * (i - 1) + j - 1] === symb ||
                                                squares[fieldSize * i + j - 1] === symb ||
                                                squares[fieldSize * (i + 1) + j - 1] === symb)) {
      return fieldSize * i + j;
    }
  }

  return null;
}

function processInnerSquares(squares, fieldSize, symb) {
  for (let i = 1; i < fieldSize - 1; i++) {
    for (let j = 1; j < fieldSize - 1; j++) {
      if (squares[fieldSize * i + j] === null && (squares[fieldSize * i + j - 1] === symb ||
                                                  squares[fieldSize * i + j + 1] === symb ||
                                                  squares[fieldSize * (i - 1) + j - 1] === symb ||
                                                  squares[fieldSize * (i - 1) + j] === symb ||
                                                  squares[fieldSize * (i - 1) + j + 1] === symb ||
                                                  squares[fieldSize * (i + 1) + j - 1] === symb ||
                                                  squares[fieldSize * (i + 1) + j] === symb ||
                                                  squares[fieldSize * (i + 1) + j + 1] === symb)) {
        return fieldSize * i + j;
      }
    }
  }

  return null;
}

export function firstEmptyIndex(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return i;
    }
  }

  return null;
}

function symbolsCount(squares) {
  let count = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] !== null) {
      count++;
    }
  }

  return count;
}

function cornerSymbolIndex(squares, fieldSize, symb) {
  if (squares[squares.length - 1] === symb) {
    return (fieldSize - 1) * fieldSize + fieldSize - 1;
  }

  if (squares[0] === symb) {
    return 0;
  }

  if (squares[(fieldSize - 1) * fieldSize] === symb) {
    return (fieldSize - 1) * fieldSize;
  }

  if (squares[fieldSize - 1] === symb) {
    return fieldSize - 1;
  }

  return null;
}

function squareEmpty(squares, index) {
  if (index < 0 || index >= squares.length) {
    return false;
  }

  if (squares[index] !== null) {
    return false
  }

  return true;
}

function firstNearIndex(squares, fieldSize, index) {
  let i = index + 1;
  if (squareEmpty(squares, i)) {
    return i;
  }

  i = index - 1;
  if (squareEmpty(squares, i)) {
    return i;
  }

  i = index + fieldSize;
  if (squareEmpty(squares, i)) {
    return i;
  }

  i = index - fieldSize;
  if (squareEmpty(squares, i)) {
    return i;
  }

  return null;
}

export function calculateMove(squares, fieldSize, symb) {
  // // 1. Если ходим крестиком и центр пуст, то ставим в центр
  // const middle = Math.floor(fieldSize / 2);
  // if (symb == 'X' && squares[fieldSize * middle + middle] === null) {
  //   return fieldSize * middle + middle;
  // }

  // 1. Если делаем первый ход ноликом и крестик стоит в углу, 
  //    то ставим рядом (не по диагонали)
  if (symb == 'O' && symbolsCount(squares) == 1) {
    let Xindex = cornerSymbolIndex(squares, fieldSize, 'X');
    let index = firstNearIndex(squares, fieldSize, Xindex);
    if (index !== null) {
      return index;
    }
  }

  const antisymb = (symb == 'O') ? 'X' : 'O';

  // 2. Если в строке/столбце/диагонали можно выиграть одним ходом, 
  //    то делаем этот ход
  let index = processLines(squares, fieldSize, symb, tryWin);
  if (index !== null) {
    return index;
  }

  // 3. Если в строке/столбце/диагонали противник может выиграть одним ходом, 
  //    то мешаем ему
  index = processLines(squares, fieldSize, antisymb, tryEscape);
  if (index !== null) {
    return index;
  }

  // 4. Если в углу есть антисимвол и противоположный от него угол пуст, 
  //    то ставим в этот угол
  index = processCorners(squares, fieldSize, antisymb);
  if (index !== null) {
    return index;
  }
    
  // 5. Если в углу есть наш символ и противоположный от него угол пуст, 
  //    то ставим в этот угол
  index = processCorners(squares, fieldSize, symb);
  if (index !== null) {
    return index;
  }
    
  // 6. Если угол пуст, то ставим в этот угол
  index = processEmptyCorners(squares, fieldSize);
  if (index !== null) {
    return index;
  }
    
  // 7. Если в строках и столбцах по краям (без углов) есть пропуск, 
  //    рядом с которым есть наш символ, то ставим в этот пропуск
  index = processSides(squares, fieldSize, symb);
  if (index !== null) {
    return index;
  }
    
  // 8. Если есть пропуск (не с краю), рядом с которым есть наш символ, 
  //    то ставим в этот пропуск
  index = processInnerSquares(squares, fieldSize, symb);
  if (index !== null) {
    return index;
  }
    
  // 9. Ставим в первую свободную клетку
  return firstEmptyIndex(squares);
}

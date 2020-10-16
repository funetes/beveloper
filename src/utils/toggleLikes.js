export const saveTolocalStorage = boardId => {
  if (localStorage.getItem('likeList')) {
    const boardArray = JSON.parse(localStorage.getItem('likeList'));
    boardArray.push(boardId);
    localStorage.setItem('likeList', JSON.stringify(boardArray));
  } else {
    localStorage.setItem('likeList', JSON.stringify([boardId]));
  }
};

export const deleteToLocalStorage = boardId => {
  if (localStorage.getItem('likeList')) {
    const boardArray = JSON.parse(localStorage.getItem('likeList'));
    const newBoardArr = boardArray.filter(board => board !== boardId);
    localStorage.setItem('likeList', JSON.stringify(newBoardArr));
  }
};

export const isInLocalStorage = boardId => {
  if (localStorage.getItem('likeList')) {
    const boardArray = JSON.parse(localStorage.getItem('likeList'));
    return boardArray.some(board => board === boardId);
  }
};

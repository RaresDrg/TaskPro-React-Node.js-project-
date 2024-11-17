import Board from "./schemas/boardsSchema.js";

async function addBoardToDB(newBoard) {
  await Board.validate(newBoard);

  const alreadyExistingDoc = await Board.findOne({
    title: newBoard.title,
    owner: newBoard.owner,
  });

  if (alreadyExistingDoc) {
    return "already exists";
  }

  return Board.create(newBoard);
}

async function getBoardsListFromDB(owner) {
  return Board.find({ owner }, { _id: 1, title: 1, icon: 1 });
}

async function getBoardFromDB(boardId) {
  return Board.findOne({ _id: boardId }, { owner: 0 });
}

function deleteBoardFromDB(boardId) {
  return Board.findOneAndDelete({ _id: boardId });
}

async function updateBoardInDB(boardId, owner, updates) {
  await Board.validate(updates);

  const alreadyExistingDoc = await Board.findOne({
    title: updates.title,
    owner: owner,
  });

  if (alreadyExistingDoc && alreadyExistingDoc.id !== boardId) {
    return "already exists";
  }

  return Board.findOneAndUpdate({ _id: boardId }, updates, {
    new: true,
    runValidators: true,
  });
}

async function addBoardColumnToDB(boardId, newColumn) {
  const alreadyExistingColumn = await Board.findOne({
    _id: boardId,
    "columns.title": newColumn.title,
  });

  if (alreadyExistingColumn) {
    return "already exists";
  }

  return Board.findOneAndUpdate(
    { _id: boardId },
    { $push: { columns: newColumn } },
    { new: true, runValidators: true }
  );
}

function getBoardColumnFromDB({ boardId, columnId }) {
  return Board.findOne({ _id: boardId, "columns._id": columnId });
}

function deleteBoardColumnFromDB({ boardId, columnId }) {
  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId },
    { $pull: { columns: { _id: columnId } } },
    { new: true }
  );
}

async function updateBoardColumnInDB({ boardId, columnId }, updates) {
  const alreadyExistingDoc = await Board.findOne(
    { _id: boardId, "columns.title": updates },
    { "columns.$": 1 }
  );

  if (alreadyExistingDoc && alreadyExistingDoc.columns[0].id !== columnId) {
    return "already exists";
  }

  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId },
    { $set: { "columns.$[column].title": updates } },
    {
      arrayFilters: [{ "column._id": columnId }],
      new: true,
      runValidators: true,
    }
  );
}

async function addBoardColumnCardToDB({ boardId, columnId }, newCard) {
  const targetedColumn = await Board.findOne(
    { _id: boardId, "columns._id": columnId },
    { "columns.$": 1 }
  );

  const columnCards = targetedColumn.columns[0]?.cards;
  const alreadyExistingCard = columnCards?.find(
    (card) => card.title === newCard.title
  );

  if (alreadyExistingCard) {
    return "already exists";
  }

  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId },
    { $push: { "columns.$[column].cards": newCard } },
    {
      arrayFilters: [{ "column._id": columnId }],
      new: true,
      runValidators: true,
    }
  );
}

function getBoardColumnCardFromDB({ boardId, columnId, cardId }) {
  return Board.findOne({
    _id: boardId,
    "columns._id": columnId,
    "columns.cards._id": cardId,
  });
}

function deleteBoardColumnCardFromDB({ boardId, columnId, cardId }) {
  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId, "columns.cards._id": cardId },
    { $pull: { "columns.$[column].cards": { _id: cardId } } },
    { arrayFilters: [{ "column._id": columnId }], new: true }
  );
}

async function updateBoardColumnCardInDB(ids, updates) {
  const { boardId, columnId, cardId } = ids;

  const targetedColumn = await Board.findOne(
    { _id: boardId, "columns._id": columnId },
    { "columns.$": 1 }
  );

  const columnCards = targetedColumn.columns[0]?.cards;
  const alreadyExistingCard = columnCards?.find(
    (item) => item.title === updates.title
  );

  if (alreadyExistingCard && alreadyExistingCard.id !== cardId) {
    return "already exists";
  }

  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId, "columns.cards._id": cardId },
    { $set: { "columns.$[column].cards.$[card]": updates } },
    {
      arrayFilters: [{ "column._id": columnId }, { "card._id": cardId }],
      new: true,
      runValidators: true,
    }
  );
}

const boardsService = {
  addBoardToDB,
  getBoardsListFromDB,
  getBoardFromDB,
  deleteBoardFromDB,
  updateBoardInDB,
  addBoardColumnToDB,
  getBoardColumnFromDB,
  updateBoardColumnInDB,
  deleteBoardColumnFromDB,
  addBoardColumnCardToDB,
  getBoardColumnCardFromDB,
  deleteBoardColumnCardFromDB,
  updateBoardColumnCardInDB,
};

export default boardsService;

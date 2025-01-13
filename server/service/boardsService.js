import Board from "./schemas/boardsSchema.js";

async function addBoardToDB(newBoard) {
  await Board.validate(newBoard);

  const query = { title: newBoard.title, owner: newBoard.owner };
  const alreadyExistingDoc = await Board.findOne(query);

  return alreadyExistingDoc
    ? {
        isInvalid: true,
        message:
          "The title you want to assign is already in use by another board",
      }
    : Board.create(newBoard);
}

function getBoardsListFromDB(owner) {
  return Board.find({ owner }, { _id: 1, title: 1, icon: 1 });
}

function getBoardFromDB(boardId) {
  return Board.findById(boardId, { owner: 0 });
}

function deleteBoardFromDB(boardId) {
  return Board.findByIdAndDelete(boardId);
}

async function updateBoardInDB(boardId, owner, updates) {
  await Board.validate(updates);

  const query = { title: updates.title, owner };
  const alreadyExistingDoc = await Board.findOne(query);

  return alreadyExistingDoc && alreadyExistingDoc.id !== boardId
    ? {
        isInvalid: true,
        message:
          "The title you want to assign is already in use by another board",
      }
    : Board.findByIdAndUpdate(boardId, updates, {
        new: true,
        runValidators: true,
      });
}

async function updateBoardColumnsInDB(boardId, updates) {
  return Board.findByIdAndUpdate(
    boardId,
    { columns: updates },
    { new: true, runValidators: true }
  );
}

async function addBoardColumnToDB(boardId, newColumn) {
  const query = { _id: boardId, "columns.title": newColumn.title };
  const alreadyExistingColumn = await Board.findOne(query);

  return alreadyExistingColumn
    ? {
        isInvalid: true,
        message:
          "The title you want to assign is already in use by another column",
      }
    : Board.findByIdAndUpdate(
        boardId,
        { $push: { columns: newColumn } },
        { new: true, runValidators: true }
      );
}

function deleteBoardColumnFromDB({ boardId, columnId }) {
  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId },
    { $pull: { columns: { _id: columnId } } },
    { new: true }
  );
}

function getBoardColumnFromDB({ boardId, columnId }) {
  return Board.findOne({ _id: boardId, "columns._id": columnId });
}

async function updateBoardColumnInDB({ boardId, columnId }, updates) {
  const query = { _id: boardId, "columns.title": updates };
  const alreadyExistingDoc = await Board.findOne(query, { "columns.$": 1 });

  return alreadyExistingDoc && alreadyExistingDoc.columns[0].id !== columnId
    ? {
        isInvalid: true,
        message:
          "The title you want to assign is already in use by another column",
      }
    : Board.findOneAndUpdate(
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
  const query = { _id: boardId, "columns._id": columnId };
  const targetedColumn = await Board.findOne(query, { "columns.$": 1 });

  const columnCards = targetedColumn?.columns[0]?.cards;
  const alreadyExistingCard = columnCards?.find(
    (card) => card.title === newCard.title
  );

  return alreadyExistingCard
    ? {
        isInvalid: true,
        message:
          "The title you want to assign is already in use by another card",
      }
    : Board.findOneAndUpdate(
        { _id: boardId, "columns._id": columnId },
        { $push: { "columns.$[column].cards": newCard } },
        {
          arrayFilters: [{ "column._id": columnId }],
          new: true,
          runValidators: true,
        }
      );
}

function deleteBoardColumnCardFromDB({ boardId, columnId, cardId }) {
  return Board.findOneAndUpdate(
    { _id: boardId, "columns._id": columnId, "columns.cards._id": cardId },
    { $pull: { "columns.$[column].cards": { _id: cardId } } },
    { arrayFilters: [{ "column._id": columnId }], new: true }
  );
}

function getBoardColumnCardFromDB({ boardId, columnId, cardId }) {
  return Board.findOne({
    _id: boardId,
    "columns._id": columnId,
    "columns.cards._id": cardId,
  });
}

async function updateBoardColumnCardInDB(ids, updates) {
  const { boardId, columnId, cardId } = ids;

  const query = { _id: boardId, "columns._id": columnId };
  const targetedColumn = await Board.findOne(query, { "columns.$": 1 });

  const columnCards = targetedColumn.columns[0]?.cards;
  const alreadyExistingCard = columnCards?.find(
    (item) => item.title === updates.title
  );

  return alreadyExistingCard && alreadyExistingCard.id !== cardId
    ? {
        isInvalid: true,
        message:
          "The title you want to assign is already in use by another card",
      }
    : Board.findOneAndUpdate(
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
  updateBoardColumnsInDB,
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

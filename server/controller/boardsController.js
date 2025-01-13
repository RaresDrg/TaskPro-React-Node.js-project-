import boardsService from "../service/boardsService.js";
import utils from "../utils/utils.js";

async function addBoard(req, res, next) {
  try {
    const owner = req.user.id;
    const { title, icon } = req.body;
    const background = {
      value: req.body.background,
      sources: utils.getBackgroundSrc(req.body.background),
    };

    const newBoard = { title, icon, background, owner };
    const result = await boardsService.addBoardToDB(newBoard);

    result?.isInvalid
      ? utils.sendFailureResponse(res, 409, result.message)
      : utils.sendSuccessResponse(res, 201, {
          message: "The board has been successfully added",
          data: {
            board: result,
            boardsList: await boardsService.getBoardsListFromDB(owner),
          },
        });
  } catch (error) {
    next(error);
  }
}

async function getBoardsList(req, res, next) {
  try {
    const owner = req.user.id;
    const boardsList = await boardsService.getBoardsListFromDB(owner);

    boardsList.length > 0
      ? utils.sendSuccessResponse(res, 200, { data: boardsList })
      : utils.sendSuccessResponse(res, 200, {
          data: null,
          message: "There are no boards saved in the database.",
        });
  } catch (error) {
    next(error);
  }
}

async function getBoard(req, res, next) {
  try {
    const { boardId } = req.params;
    const board = await boardsService.getBoardFromDB(boardId);

    board
      ? utils.sendSuccessResponse(res, 200, { data: board })
      : utils.sendFailureResponse(res, 404, "Not found");
  } catch (error) {
    next(error);
  }
}

async function deleteBoard(req, res, next) {
  try {
    const { boardId } = req.params;
    const result = await boardsService.deleteBoardFromDB(boardId);

    if (!result) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const owner = req.user.id;
    const currentBoardsList = await boardsService.getBoardsListFromDB(owner);

    utils.sendSuccessResponse(res, 200, {
      message: "The board has been successfully deleted",
      data: currentBoardsList.length > 0 ? currentBoardsList : null,
    });
  } catch (error) {
    next(error);
  }
}

async function updateBoard(req, res, next) {
  try {
    const { boardId } = req.params;
    const targetedBoard = await boardsService.getBoardFromDB(boardId);

    if (!targetedBoard) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const owner = req.user.id;
    const { title, icon } = req.body;
    const background = {
      value: req.body.background,
      sources: utils.getBackgroundSrc(req.body.background),
    };

    const updates = { title, icon, background };
    const result = await boardsService.updateBoardInDB(boardId, owner, updates);

    result?.isInvalid
      ? utils.sendFailureResponse(res, 409, result.message)
      : utils.sendSuccessResponse(res, 200, {
          message: "The board has been successfully updated",
          data: {
            board: result,
            boardsList: await boardsService.getBoardsListFromDB(owner),
          },
        });
  } catch (error) {
    next(error);
  }
}

async function updateBoardColumns(req, res, next) {
  try {
    const { boardId } = req.params;
    const targetedBoard = await boardsService.getBoardFromDB(boardId);

    if (!targetedBoard) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { columns } = req.body;
    const isReqValid = Array.isArray(columns) && columns.length > 0;

    if (!isReqValid) {
      const message =
        "In order to update your board's columns, you have to provide an array of objects, containing the new columns.";
      utils.sendFailureResponse(res, 400, message);
      return;
    }

    const result = await boardsService.updateBoardColumnsInDB(boardId, columns);

    utils.sendSuccessResponse(res, 200, {
      message: "The board's columns have been successfully updated",
      data: result.columns,
    });
  } catch (error) {
    next(error);
  }
}

async function addColumn(req, res, next) {
  try {
    const { boardId } = req.params;
    const targetedBoard = await boardsService.getBoardFromDB(boardId);

    if (!targetedBoard) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title } = req.body;
    if (!title) {
      utils.sendFailureResponse(res, 400, "title: => this field is required");
      return;
    }

    const result = await boardsService.addBoardColumnToDB(boardId, { title });
    result?.isInvalid
      ? utils.sendFailureResponse(res, 409, result.message)
      : utils.sendSuccessResponse(res, 201, {
          message: "The column has been successfully added",
          data: { columns: result.columns },
        });
  } catch (error) {
    next(error);
  }
}

async function deleteColumn(req, res, next) {
  try {
    const { boardId, columnId } = req.params;
    const ids = { boardId, columnId };
    const result = await boardsService.deleteBoardColumnFromDB(ids);

    !result
      ? utils.sendFailureResponse(res, 404, "Not found")
      : utils.sendSuccessResponse(res, 200, {
          message: "The column has been successfully deleted",
          data: { columns: result.columns },
        });
  } catch (error) {
    next(error);
  }
}

async function updateColumn(req, res, next) {
  try {
    const { boardId, columnId } = req.params;
    const ids = { boardId, columnId };

    const targetedColumn = await boardsService.getBoardColumnFromDB(ids);
    if (!targetedColumn) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title } = req.body;
    if (!title) {
      utils.sendFailureResponse(res, 400, "title: => this field is required");
      return;
    }

    const result = await boardsService.updateBoardColumnInDB(ids, title);
    result?.isInvalid
      ? utils.sendFailureResponse(res, 409, result.message)
      : utils.sendSuccessResponse(res, 200, {
          message: "The column has been successfully updated",
          data: { columns: result.columns },
        });
  } catch (error) {
    next(error);
  }
}

async function addCard(req, res, next) {
  try {
    const { boardId, columnId } = req.params;
    const ids = { boardId, columnId };

    const targetedColumn = await boardsService.getBoardColumnFromDB(ids);
    if (!targetedColumn) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title, description, priority, deadline } = req.body;
    if (!title || !description || !priority || !deadline) {
      const message =
        "You must provide values for all of these fields: title, description, priority and deadline";
      utils.sendFailureResponse(res, 400, message);
      return;
    }

    const isDeadlineValid = utils.checkDeadline(deadline);
    if (!isDeadlineValid) {
      const message =
        "The deadline should be a date that is greater than or equal to today's date";
      utils.sendFailureResponse(res, 400, message);
      return;
    }

    const newCard = { title, description, priority, deadline };
    const result = await boardsService.addBoardColumnCardToDB(ids, newCard);

    result?.isInvalid
      ? utils.sendFailureResponse(res, 409, result.message)
      : utils.sendSuccessResponse(res, 201, {
          message: "The card has been successfully added",
          data: { columns: result.columns },
        });
  } catch (error) {
    next(error);
  }
}

async function deleteCard(req, res, next) {
  try {
    const { boardId, columnId, cardId } = req.params;
    const ids = { boardId, columnId, cardId };
    const result = await boardsService.deleteBoardColumnCardFromDB(ids);

    !result
      ? utils.sendFailureResponse(res, 404, "Not found")
      : utils.sendSuccessResponse(res, 200, {
          message: "The card has been successfully deleted",
          data: { columns: result.columns },
        });
  } catch (error) {
    next(error);
  }
}

async function updateCard(req, res, next) {
  try {
    const { boardId, columnId, cardId } = req.params;
    const ids = { boardId, columnId, cardId };

    const targetedCard = await boardsService.getBoardColumnCardFromDB(ids);
    if (!targetedCard) {
      utils.sendFailureResponse(res, 404, "Not found");
      return;
    }

    const { title, description, priority, deadline } = req.body;
    if (!title || !description || !priority || !deadline) {
      const message =
        "You must provide values for all of these fields: title, description, priority and deadline";
      utils.sendFailureResponse(res, 400, message);
      return;
    }

    const isDeadlineValid = utils.checkDeadline(deadline);
    if (!isDeadlineValid) {
      const message =
        "The deadline should be a date that is greater than or equal to today's date";
      utils.sendFailureResponse(res, 400, message);
      return;
    }

    const updates = { title, description, priority, deadline };
    const result = await boardsService.updateBoardColumnCardInDB(ids, updates);

    result?.isInvalid
      ? utils.sendFailureResponse(res, 409, result.message)
      : utils.sendSuccessResponse(res, 200, {
          message: "The card has been successfully updated",
          data: { columns: result.columns },
        });
  } catch (error) {
    next(error);
  }
}

const boardsController = {
  addBoard,
  getBoardsList,
  getBoard,
  deleteBoard,
  updateBoard,
  updateBoardColumns,
  addColumn,
  deleteColumn,
  updateColumn,
  addCard,
  deleteCard,
  updateCard,
};

export default boardsController;

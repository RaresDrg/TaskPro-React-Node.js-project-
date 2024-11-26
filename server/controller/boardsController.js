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

    if (result === "already exists") {
      res.status(409).json({
        status: "failed",
        code: 409,
        message:
          "The title you want to assign is already in use by another board",
      });
      return;
    }

    const currentBoardsList = await boardsService.getBoardsListFromDB(owner);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "The board has been successfully added",
      data: {
        board: result,
        boardsList: currentBoardsList,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

    next(error);
  }
}

async function getBoardsList(req, res, next) {
  try {
    const owner = req.user.id;
    const boardsList = await boardsService.getBoardsListFromDB(owner);

    res.status(200).json({
      status: "success",
      code: 200,
      data: boardsList.length > 0 ? boardsList : null,
    });
  } catch (error) {
    next(error);
  }
}

async function getBoard(req, res, next) {
  try {
    const { boardId } = req.params;
    const result = await boardsService.getBoardFromDB(boardId);

    if (!result) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    res.status(200).json({ status: "succes", code: 200, data: result });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    next(error);
  }
}

async function deleteBoard(req, res, next) {
  try {
    const { boardId } = req.params;
    const result = await boardsService.deleteBoardFromDB(boardId);

    if (!result) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    const owner = req.user.id;
    const currentBoardsList = await boardsService.getBoardsListFromDB(owner);

    res.status(200).json({
      status: "succes",
      code: 200,
      message: "The board has been successfully deleted",
      data: currentBoardsList.length > 0 ? currentBoardsList : null,
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    next(error);
  }
}

async function updateBoard(req, res, next) {
  try {
    const { boardId } = req.params;
    const targetedBoard = await boardsService.getBoardFromDB(boardId);

    if (!targetedBoard) {
      res.status(404).json({ code: 404, message: "Not found" });
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

    if (result === "already exists") {
      res.status(409).json({
        status: "failed",
        code: 409,
        message:
          "The title you want to assign is already in use by another board",
      });
      return;
    }

    const currentBoardsList = await boardsService.getBoardsListFromDB(owner);

    res.status(200).json({
      status: "succes",
      code: 200,
      message: "The board has been successfully updated",
      data: {
        board: result,
        boardsList: currentBoardsList,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

    next(error);
  }
}

async function updateBoardColumns(req, res, next) {
  try {
    const { boardId } = req.params;
    const targetedBoard = await boardsService.getBoardFromDB(boardId);

    if (!targetedBoard) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    const { columns } = req.body;
    const isReqValid = Array.isArray(columns) && columns.length > 0;

    if (!isReqValid) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message:
          "In order to update your board's columns, you have to provide an array of objects, containing the new columns.",
      });
      return;
    }

    const result = await boardsService.updateBoardColumnsInDB(boardId, columns);

    res.status(200).json({
      status: "succes",
      code: 200,
      message: "The board's columns have been successfully updated",
      data: result.columns,
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

    next(error);
  }
}

async function addColumn(req, res, next) {
  try {
    const { boardId } = req.params;
    const targetedBoard = await boardsService.getBoardFromDB(boardId);

    if (!targetedBoard) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    const newColumn = { title: req.body.title };
    const result = await boardsService.addBoardColumnToDB(boardId, newColumn);

    if (result === "already exists") {
      res.status(409).json({
        status: "failed",
        code: 409,
        message:
          "The title you want to assign is already in use by another column",
      });
      return;
    }

    const currentColumns = result.columns;
    const columnJustAdded = currentColumns.find(
      (item) => item.title === req.body.title
    );

    res.status(201).json({
      status: "success",
      code: 201,
      message: "The column has been successfully added",
      data: {
        column: columnJustAdded,
        columns: currentColumns,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

    next(error);
  }
}

async function deleteColumn(req, res, next) {
  try {
    const { boardId, columnId } = req.params;
    const result = await boardsService.deleteBoardColumnFromDB({
      boardId,
      columnId,
    });

    if (!result) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "The column has been successfully deleted",
      data: {
        columns: result.columns,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    next(error);
  }
}

async function updateColumn(req, res, next) {
  try {
    const { boardId, columnId } = req.params;
    const targetedColumn = await boardsService.getBoardColumnFromDB({
      boardId,
      columnId,
    });

    if (!targetedColumn) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    const updates = req.body.title;
    const result = await boardsService.updateBoardColumnInDB(
      { boardId, columnId },
      updates
    );

    if (result === "already exists") {
      res.status(409).json({
        status: "failed",
        code: 409,
        message:
          "The title you want to assign is already in use by another column",
      });
      return;
    }

    const currentColumns = result.columns;
    const columnJustUpdated = currentColumns.find(
      (item) => item.title === req.body.title
    );

    res.status(200).json({
      status: "success",
      code: 200,
      message: "The column has been successfully updated",
      data: {
        column: columnJustUpdated,
        columns: currentColumns,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

    next(error);
  }
}

async function addCard(req, res, next) {
  try {
    const { boardId, columnId } = req.params;
    const targetedColumn = await boardsService.getBoardColumnFromDB({
      boardId,
      columnId,
    });

    if (!targetedColumn) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    const { title, description, priority, deadline } = req.body;
    const hasAllrequiredFields = title && description && priority && deadline;

    if (!hasAllrequiredFields) {
      res.status(400).json({
        status: "failed",
        code: 400,
        message:
          "In order to add a card, you must enter values for all of these fields: title, description, priority and deadline",
      });
      return;
    }

    const newCard = { title, description, priority, deadline };
    const result = await boardsService.addBoardColumnCardToDB(
      { boardId, columnId },
      newCard
    );

    if (result === "already exists") {
      res.status(409).json({
        status: "failed",
        code: 409,
        message:
          "The title you want to assign is already in use by another card",
      });
      return;
    }

    res.status(201).json({
      status: "success",
      code: 201,
      message: "The card has been successfully added",
      data: {
        columns: result.columns,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

    next(error);
  }
}

async function deleteCard(req, res, next) {
  try {
    const { boardId, columnId, cardId } = req.params;
    const result = await boardsService.deleteBoardColumnCardFromDB({
      boardId,
      columnId,
      cardId,
    });

    if (!result) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "The card has been successfully deleted",
      data: {
        columns: result.columns,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    next(error);
  }
}

async function updateCard(req, res, next) {
  try {
    const { boardId, columnId, cardId } = req.params;
    const ids = { boardId, columnId, cardId };
    const targetedCard = await boardsService.getBoardColumnCardFromDB(ids);

    if (!targetedCard) {
      res.status(404).json({ code: 404, message: "Not found" });
      return;
    }

    const { title, description, priority, deadline } = req.body;
    const updates = { title, description, priority, deadline };
    const result = await boardsService.updateBoardColumnCardInDB(ids, updates);

    if (result === "already exists") {
      res.status(409).json({
        status: "failed",
        code: 409,
        message:
          "The title you want to assign is already in use by another card",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "The card has been successfully updated",
      data: {
        columns: result.columns,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      utils.handleInvalidIdError(res);
      return;
    }

    if (error.name === "ValidationError") {
      utils.handleValidationError(res, error.message);
      return;
    }

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

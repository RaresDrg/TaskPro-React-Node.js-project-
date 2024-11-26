import express from "express";
import boardsController from "../../controller/boardsController.js";

const router = express.Router();

router.post("/", boardsController.addBoard);
router.get("/", boardsController.getBoardsList);
router.get("/:boardId", boardsController.getBoard);
router.delete("/:boardId", boardsController.deleteBoard);
router.put("/:boardId", boardsController.updateBoard);
router.patch("/:boardId/columns", boardsController.updateBoardColumns);

router.post("/:boardId/columns", boardsController.addColumn);
router.delete("/:boardId/columns/:columnId", boardsController.deleteColumn);
router.patch("/:boardId/columns/:columnId", boardsController.updateColumn);

router.post("/:boardId/columns/:columnId/cards", boardsController.addCard);
router.delete(
  "/:boardId/columns/:columnId/cards/:cardId",
  boardsController.deleteCard
);
router.patch(
  "/:boardId/columns/:columnId/cards/:cardId",
  boardsController.updateCard
);

export default router;

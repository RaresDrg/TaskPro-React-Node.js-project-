import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (newBoard, thunkAPI) => {
    try {
      const response = await axios.post("/api/boards", newBoard);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getBoardsList = createAsyncThunk(
  "boards/getList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/boards");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getBoard = createAsyncThunk(
  "boards/getBoard",
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/boards/${boardId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/boards/${boardId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async ({ boardId, updates }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/boards/${boardId}`, updates);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addBoardColumn = createAsyncThunk(
  "boards/addBoardColumn",
  async ({ boardId, newColumn }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/boards/${boardId}/columns`,
        newColumn
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteBoardColumn = createAsyncThunk(
  "boards/deleteBoardColumn",
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/api/boards/${boardId}/columns/${columnId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateBoardColumn = createAsyncThunk(
  "boards/updateBoardColumn",
  async ({ boardId, columnId, updates }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/boards/${boardId}/columns/${columnId}`,
        updates
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addBoardColumnCard = createAsyncThunk(
  "boards/addBoardColumnCard",
  async ({ boardId, columnId, newCard }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/boards/${boardId}/columns/${columnId}/cards`,
        newCard
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteBoardColumnCard = createAsyncThunk(
  "boards/deleteBoardColumnCard",
  async ({ boardId, columnId, cardId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/api/boards/${boardId}/columns/${columnId}/cards/${cardId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateBoardColumnCard = createAsyncThunk(
  "boards/updateBoardColumnCard",
  async ({ boardId, columnId, cardId, updates }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
        updates
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  addBoard,
  getBoardsList,
  getBoard,
  deleteBoard,
  updateBoard,
  addBoardColumn,
  deleteBoardColumn,
  updateBoardColumn,
  addBoardColumnCard,
  deleteBoardColumnCard,
  updateBoardColumnCard,
};

export const updateBoardColumns = (boardId, updatedColumns) => {
  axios.put(`/api/boards/${boardId}/columns`, {
    columns: updatedColumns,
  });
};

import axios from "axios";
import { Diary, newDiary } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getAllEntries = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

export const createNewEntry = async (object: newDiary) => {
  const response = await axios.post<Diary>(baseUrl, object);
  return response.data;
};

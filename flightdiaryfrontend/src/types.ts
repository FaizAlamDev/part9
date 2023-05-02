export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export type newDiary = Omit<Diary, "id">;

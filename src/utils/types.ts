export type TaskType = {
  _id: string;
  date: string;
  name: string;
  text: string;
  isImportant: boolean;
  isDone: boolean;
  author: string | null;
};

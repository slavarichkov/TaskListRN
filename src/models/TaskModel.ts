export type TaskType = {
  _id: string;
  date: string;
  name: string;
  text: string;
  isImportant: boolean;
  isDone: boolean;
  author: string | null;
};

export interface TaskModel {
  tasks: TaskType[];
  isLoading: boolean;
  isFormOpened: boolean;
  updatingItem: any;
  isSubmitLoading: boolean;
  isImportantTasks: boolean;

  // Методы для взаимодействия с данными
  getTasks(): Promise<void>;
  createTask(data: TaskType): Promise<void>;
  updateTask(data: TaskType): Promise<void>;
  removeTask(id: string): Promise<void>;
  setFormOpened(isOpened: boolean): void;
  setImportantTasks(isImportant: boolean): void;
}

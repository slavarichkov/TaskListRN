import jest from 'jest';
import {Alert} from 'react-native';
import {useTaskPresenter} from '../src/screens/TaskListScreen/TaskListScreen/TaskListPresenter';
import {getDeviceId} from '../src/utils/asyncStoreFunctions';
const {createTasks} = useTaskPresenter();

// getDeviceId и apiTask
jest.mock('../src/utils/asyncStoreFunctions', () => ({
  getDeviceId: jest.fn().mockResolvedValue('deviceId'), // Мок для getDeviceId
}));
jest.mock('../src/services/api', () => ({
  createTask: jest.fn().mockResolvedValue({
    task: {
      name: 'name',
      text: 'text',
      isImportant: true,
      isDone: false,
    },
  }), // Мок для apiTask.createTask
}));
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe('createTasks function', () => {
  it('should create a task successfully', async () => {
    // Mocking setSubmitLoading, setTasks и closeFormAddOrUpdateTasks
    const setSubmitLoadingMock = jest.fn();
    const setTasksMock = jest.fn();
    const closeFormAddOrUpdateTasksMock = jest.fn();

    // Вызов функции
    await createTasks({
      name: 'name',
      text: 'text',
      isImportant: true,
      isDone: false,
    });

    // Проверка вызовов функций и методов
    expect(setSubmitLoadingMock).toHaveBeenCalledWith(true);
    expect(getDeviceId).toHaveBeenCalled();
    expect(createTask).toHaveBeenCalled();
    expect(setTasksMock).toHaveBeenCalled();
    expect(setSubmitLoadingMock).toHaveBeenCalledWith(false);
    expect(closeFormAddOrUpdateTasksMock).toHaveBeenCalled();
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('should handle error if task creation fails', async () => {
    const setSubmitLoadingMock = jest.fn();
    const setTasksMock = jest.fn();
    const closeFormAddOrUpdateTasksMock = jest.fn();

    // Имитация ошибки при создании задачи
    createTask.mockRejectedValueOnce('Some error');

    // Вызов функции
    await createTasks({
      name: 'name',
      text: 'text',
      isImportant: true,
      isDone: false,
    });

    // Проверка вызовов функций и методов
    expect(setSubmitLoadingMock).toHaveBeenCalledWith(true);
    expect(getDeviceId).toHaveBeenCalled();
    expect(createTasks).toHaveBeenCalled();
    expect(setTasksMock).not.toHaveBeenCalled();
    expect(setSubmitLoadingMock).toHaveBeenCalledWith(false);
    expect(closeFormAddOrUpdateTasksMock).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith(
      'Ошибка',
      'Не удалось добавить задачу, попробуйте позже',
    );
  });
});

import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {TaskType} from '../models/TaskModel';
import apiTask from '../services/api';
import {getDeviceId} from '../utils/asyncStoreFunctions';
import {sortByDateAscending} from '../utils/functions';

export const useTaskPresenter = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showedTasks, setShowedTasks] = useState<TaskType[] | undefined>(
    undefined,
  );
  // Формы
  const [isOpenededFormAddTasks, setOpenedFormAddTasks] =
    useState<boolean>(false);
  const [updatingItem, setUpdatingItem] = useState<any>();
  // Лоадеры
  const [isSubmitLoading, setSubmitLoading] = useState<boolean>(false);
  // Фильтр
  const [isImportantTasks, setImportantTasks] = useState<boolean>(false);

  function handleClickUpdate(item: any) {
    setUpdatingItem(item);
    openFormAddTasks();
  }

  async function handleCkickRemove(id: string) {
    try {
      const deviceId = await getDeviceId();
      await apiTask.removeTask(deviceId, id);
      const filtredTasks = tasks.filter(task => task._id !== id);
      setTasks(filtredTasks);
    } catch (err) {
      console.log(err);
    }
  }

  function openFormAddTasks() {
    setOpenedFormAddTasks(true);
  }

  function closeFormAddOrUpdateTasks() {
    setOpenedFormAddTasks(false);
    setUpdatingItem(undefined);
  }

  async function createTasks(data: TaskType) {
    try {
      setSubmitLoading(true);
      const deviceId = await getDeviceId();
      data.author = deviceId;
      const newTask = await apiTask.createTask(data);
      const updateTasks = [...tasks, newTask.task];
      setTasks(updateTasks);
      setSubmitLoading(false);
      closeFormAddOrUpdateTasks();
    } catch (error) {
      setSubmitLoading(false);
      Alert.alert('Ошибка', 'Не удалось добавить задачу, попробуйте позже');
    }
  }

  async function updateTasks(data: TaskType) {
    try {
      setSubmitLoading(true);
      const deviceId = await getDeviceId();
      data.author = deviceId;
      data._id = updatingItem._id;
      console.log(data);
      const updatedTask = await apiTask.updateTask(data);
      const updatedTasks = tasks.map(task => {
        if (task._id.toString() === updatedTask.task._id.toString()) {
          return updatedTask.task;
        } else {
          return task;
        }
      });
      setTasks(updatedTasks);
      setSubmitLoading(false);
      closeFormAddOrUpdateTasks();
    } catch (error) {
      setSubmitLoading(false);
      setSubmitLoading(false);
      Alert.alert('Ошибка', 'Не удалось добавить задачу, попробуйте позже');
    }
  }

  async function handleCkickDone(selectedTask: TaskType) {
    try {
      setSubmitLoading(true);
      const updatedTask = await apiTask.updateTask(selectedTask);
      const updatedTasks = tasks.map(task => {
        if (task._id.toString() === updatedTask.task._id.toString()) {
          return updatedTask.task;
        } else {
          return task;
        }
      });
      setTasks(updatedTasks);
      setSubmitLoading(false);
      closeFormAddOrUpdateTasks();
    } catch (error) {
      console.log(error);
      setSubmitLoading(false);
      setSubmitLoading(false);
      Alert.alert('Ошибка', 'Не удалось добавить задачу, попробуйте позже');
    }
  }

  function controlFiltrerImportant() {
    setImportantTasks(!isImportantTasks);
  }

  // Получить список задач
  async function getTasksUser() {
    try {
      const deviceId = await getDeviceId();
      const tasksArray = await apiTask.getTasks(deviceId);
      setTasks(tasksArray.tasks);
    } catch {
      Alert.alert(
        'Ошибка',
        'Не удалось получить список задач с сервера, попробуйте позже',
      );
    }
  }

  useEffect(() => {
    getTasksUser();
  }, []);

  useEffect(() => {
    // Сортировка по дате
    let array = sortByDateAscending(tasks);
    if (isImportantTasks) {
      array = array.filter((item: TaskType) => {
        return item.isImportant.toString() === 'true';
      });
    }
    setShowedTasks(array);
  }, [isImportantTasks, tasks]);

  return {
    showedTasks,
    isOpenededFormAddTasks,
    updatingItem,
    isSubmitLoading,
    isImportantTasks,
    handleClickUpdate,
    handleCkickRemove,
    openFormAddTasks,
    closeFormAddOrUpdateTasks,
    createTasks,
    updateTasks,
    handleCkickDone,
    controlFiltrerImportant,
  };
};

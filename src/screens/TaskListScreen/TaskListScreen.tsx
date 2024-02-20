/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {TaskType} from '../../utils/types';
import {sortByDateAscending} from '../../utils/functions';
import {useTheme} from '../../contexts/theme/ThemeContext';
import HeaderListTasks from './components/HeaderListTasks';
import ItemListTasks from './components/ItemListTasks';
import FormAddOrUpdate from './components/FormAddOrUpdate';
import apiTask from '../../services/api';
import {getDeviceId} from '../../utils/asyncStoreFunctions';

const TaskListScreen = () => {
  const {colorText, backgroundColor} = useTheme();

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showedTasks, setShowedTasks] = useState<TaskType[] | undefined>(undefined);
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
          return task; // если это не объект для замены, оставляем его без изменений
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

  // Компоненты FlatList
  const ItemSeparator = () => <View style={styles.separator} />;

  const HeaderList = () => {
    return (
      <HeaderListTasks
        openForm={openFormAddTasks}
        isFiltredImportants={isImportantTasks}
        setIsFiltredImportants={controlFiltrerImportant}
      />
    );
  };

  type ItemListProps = {
    item: any;
  };
  const ItemList: React.FC<ItemListProps> = ({item}) => {
    return (
      <ItemListTasks
        item={item}
        handleClickUpdate={handleClickUpdate}
        handleClickRemove={handleCkickRemove}
        handleClickDone={handleCkickDone}
        colorText={colorText}
      />
    );
  };

  const FooterList = () => {
    return <View style={{paddingBottom: 170}} />;
  };

  // Мемоизированная версия FlatList
  const MemoizedFlatList = useMemo(
    () => (
      <FlatList
        data={showedTasks}
        renderItem={ItemList}
        keyExtractor={item => item._id}
        style={styles.flatList} // Применение стилей к FlatList
        ListHeaderComponent={HeaderList}
        ListFooterComponent={FooterList} // компонент-футер
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      />
    ),
    [showedTasks, isImportantTasks],
  );

  return (
    <View style={[styles.container, backgroundColor]}>
      {MemoizedFlatList}
      {isOpenededFormAddTasks ? (
        <FormAddOrUpdate
          isVisible={isOpenededFormAddTasks}
          handleSubmitAdd={createTasks}
          handleSubmitUpdate={updateTasks}
          handleCloseForm={closeFormAddOrUpdateTasks}
          isSubmitLoading={isSubmitLoading}
          updatingTask={updatingItem}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 30,
  },
  flatList: {
    flex: 1,
    width: screenWidth,
  },
});

export default TaskListScreen;

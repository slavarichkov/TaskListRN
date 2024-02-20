/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {TaskType} from '../../utils/types';
import {sortByDateAscending} from '../../utils/functions';
import {useTheme} from '../../contexts/theme/ThemeContext';
import HeaderListTasks from './components/HeaderListTasks';
import ItemListTasks from './components/ItemListTasks';
import FormAddOrUpdate from './components/FormAddOrUpdate';

const TaskListScreen = () => {
  const task1 = {
    _id: '1111',
    date: new Date().toString(),
    name: 'TaskListScreen',
    text: 'Task List Screen',
    isImportant: false,
    isDone: false,
  };

  const task2 = {
    _id: '11111',
    date: new Date().toString(),
    name: 'TaskListScreen',
    text: 'Task List Screen',
    isImportant: false,
    isDone: false,
  };

  const testArray = [task1, task2];

  const {colorText} = useTheme();

  const [tasks, setTasks] = useState<TaskType[] | undefined>(undefined);
  const [showedTasks, setShowedTasks] = useState<TaskType[] | undefined>(
    undefined,
  );
  // Формы
  const [isOpenededFormAddTasks, setOpenedFormAddTasks] =
    useState<boolean>(false);
  const [isOpenededFormUpdateTasks, setOpenedFormUpdateTasks] =
    useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  // Лоадеры
  const [isSubmitLoading, setSubmitLoading] = useState<boolean>(false);
  // Фильтр
  const [isImportantTasks, setImportantTasks] = useState<boolean>(false);

  function handleClickUpdate(item: any) {
    setSelectedItem(item);
    openFormUpdateTasks();
  }

  function handleCkickRemove(item: any) {}

  function openFormAddTasks() {
    setOpenedFormAddTasks(true);
  }

  function closeFormAddOrUpdateTasks() {
    setOpenedFormAddTasks(false);
  }

  function createTasks(data: TaskType) {
    console.log(data);
  }

  function openFormUpdateTasks() {
    setOpenedFormUpdateTasks(true);
  }

  function updateTasks(data: TaskType) {
    console.log(data);
  }

  function handleCkickDone(data: TaskType) {
    console.log(data);
  }

  function controlFiltrerImportant() {
    setImportantTasks(!isImportantTasks);
  }

  useEffect(() => {
    // Сортировка по дате
    let array = sortByDateAscending(testArray);
    if (isImportantTasks) {
      array = array.filter((item: TaskType) => {
        return item.isImportant.toString() === 'true';
      });
    }
    setShowedTasks(array);
  }, [isImportantTasks]);

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

  return (
    <View style={styles.container}>
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
      {isOpenededFormAddTasks ? (
        <FormAddOrUpdate
          isVisible={isOpenededFormAddTasks}
          handleSubmitAdd={createTasks}
          handleSubmitUpdate={updateTasks}
          handleCloseForm={closeFormAddOrUpdateTasks}
          isSubmitLoading={isSubmitLoading}
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

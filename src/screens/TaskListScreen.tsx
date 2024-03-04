/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/theme/ThemeContext';
import HeaderListTasks from '../components/TaskList/HeaderListTasks';
import ItemListTasks from '../components/TaskList/ItemListTasks';
import FormAddOrUpdate from '../components/TaskList/FormAddOrUpdate';
import { useTaskPresenter } from '../presenters/TaskListPresenter';

const TaskListScreen = () => {
  const { colorText, backgroundColor } = useTheme();

  const {
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
  } = useTaskPresenter();

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
  const ItemList: React.FC<ItemListProps> = ({ item }) => {
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
    return <View style={{ paddingBottom: 170 }} />;
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
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
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

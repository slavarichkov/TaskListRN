import React, {FC, useState} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ButtonImage from '../../../components/buttons/ButtonImage';

import imgUpdate from '../../../assets/images/edit-2-svgrepo-com.png';
import imgRemove from '../../../assets/images/trash-basket-svgrepo-com.png';
import FormTwoTextButton from '../../../components/forms/FormTwoTextButton';
import Checkbox from '../../../components/checkboxs/Checkbox';
import {TaskType} from '../../../utils/types';

interface Props {
  item: TaskType;
  colorText: {a: string; b: string};
  handleClickUpdate: (data: TaskType) => void;
  handleClickRemove: (id: string) => void;
  handleClickDone: (data: TaskType, state: boolean) => void;
}

const ItemListTasks: FC<Props> = ({
  item,
  colorText,
  handleClickUpdate,
  handleClickRemove,
  handleClickDone,
}) => {
  // Формы
  const [isOpenedFormRemove, setIsOpenedFormRemove] = useState<boolean>(false);

  function update() {
    handleClickUpdate(item);
  }

  function remove() {
    handleClickRemove(item._id);
  }

  function openFormRemove() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpenedFormRemove(true);
  }

  function closeFormRemove() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpenedFormRemove(false);
  }

  function toggle() {
    if (item) {
      const updatedObj={
        _id: item._id,
        author: item.author,
        isDone: !item.isDone,
      }
      handleClickDone(updatedObj);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={[styles.textImportant, colorText]}>
          {item.isImportant ? 'Важная' : 'Не важная'}
        </Text>
        <Checkbox text={'Выполнено'} isChecked={item.isDone} setChecked={toggle} />
      </View>
      <Text style={[styles.title, colorText]}>{item.name}</Text>
      <Text style={[styles.text, colorText]}>{item.text}</Text>
      {!isOpenedFormRemove ? (
        <View style={styles.containerButton}>
          <ButtonImage
            URLImg={imgRemove}
            onPress={openFormRemove}
            style={{width: 20, height: 20}}
          />
          <ButtonImage
            URLImg={imgUpdate}
            onPress={update}
            style={{width: 20, height: 20}}
          />
        </View>
      ) : (
        <></>
      )}
      {isOpenedFormRemove ? (
        <FormTwoTextButton
          text="Удалить объявление"
          textButtonOne="Да"
          textButtonTwo="Нет"
          onClickOne={remove}
          onClickTwo={closeFormRemove}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const width = Dimensions.get('window').width * 0.95;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    padding: 17,
    width: width,
    maxWidth: 500,
  },
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    paddingTop: 17,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
    paddingTop: 12,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  textImportant: {
    fontSize: 14,
    fontWeight: '400',
  },
  containerButton: {
    paddingTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ItemListTasks;

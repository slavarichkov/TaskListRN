import {StyleSheet, View} from 'react-native';
import Form from '../../../components/forms/Form';
import TextInputWithLabelInside from '../../../components/Inputs/TextInputWithLableAndValidation';
import {FC, useEffect, useState} from 'react';
import {TaskType} from '../../../utils/types';
import Checkbox from '../../../components/checkboxs/Checkbox';
import {regexStrokeInput} from '../../../utils/regex';

interface dataSubmit {
  name: string;
  text: string;
  isImportant: boolean;
  date: string;
}

interface Props {
  isVisible: boolean;
  isSubmitLoading?: boolean;
  handleSubmitAdd: (data: dataSubmit) => void;
  handleSubmitUpdate: (data: dataSubmit) => void;
  handleCloseForm: () => void;
  updatingTask?: TaskType;
}

const FormAddOrUpdate: FC<Props> = ({
  isVisible,
  isSubmitLoading,
  handleSubmitAdd,
  handleSubmitUpdate,
  handleCloseForm,
  updatingTask,
}) => {
  const [taskName, setTaskName] = useState<string>('');
  const [taskText, setTaskText] = useState<string>('');
  const [isImportant, setTaskImportant] = useState<boolean>(false);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [messageValidation, setMessageValidation] = useState<string>('');

  function onSubmitForm() {
    if (isValidForm) {
      const taskObj = {
        name: taskName,
        text: taskText,
        isImportant,
        date: new Date().toString(),
      };
      updatingTask ? handleSubmitUpdate(taskObj) : handleSubmitAdd(taskObj);
    }
  }

  //Валидация
  useEffect(() => {
    const isValidName =
      taskName !== '' && regexStrokeInput.test(taskName) ? true : false;
    const isValidText =
      taskText !== '' && regexStrokeInput.test(taskName) ? true : false;
    const isValidUpdate =
      updatingTask &&
      taskName === updatingTask.name &&
      taskName === updatingTask.text &&
      updatingTask.isImportant.toString() === isImportant.toString()
        ? false
        : true;
    if (isValidName && isValidText && isValidUpdate) {
      setIsValidForm(true);
      setMessageValidation('');
    } else {
      setIsValidForm(false);
      setMessageValidation(
        isValidUpdate === false
          ? 'Внесите изменения для редактирования'
          : 'Пропущено поле или указан недопустимый символ',
      );
    }
  }, [taskName, taskText, isImportant, updatingTask]);

  return (
    <View>
      <Form
        textSubmit={updatingTask ? 'Редактировать' : 'Создать'}
        nameForm={updatingTask ? 'Редактировать задачу' : 'Новая задача'}
        isFormValid={isValidForm}
        sumbit={onSubmitForm}
        isSubmitLoading={isSubmitLoading}
        onCloseForm={handleCloseForm}
        isVisible={isVisible}
        messageValidation={messageValidation}
        child={
          <View style={styles.container}>
            <TextInputWithLabelInside
              placeholder={'Введите название'}
              label="Название"
              value={taskName}
              onChangeText={setTaskName}
              maxLength={100}
              handleInputSubmit={onSubmitForm}
            />
            <TextInputWithLabelInside
              placeholder={'Введите текст'}
              label="Текст"
              value={taskText}
              onChangeText={setTaskText}
              maxLength={1000}
              multiline={true}
              handleInputSubmit={onSubmitForm}
            />
            <View style={styles.checkBox}>
              <Checkbox
                text={'Отметить как важную'}
                isChecked={isImportant}
                setChecked={setTaskImportant}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
  },
  checkBox: {
    width: '100%',
    paddingTop: 17,
  },
});

export default FormAddOrUpdate;

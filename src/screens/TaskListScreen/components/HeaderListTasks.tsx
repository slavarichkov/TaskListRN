import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../../components/buttons/Button';
import Filter from './Filter';

interface Props {
  openForm: () => void;
  isFiltredImportants: boolean;
  setIsFiltredImportants: () => void;
}

const HeaderListTasks: FC<Props> = ({
  openForm,
  isFiltredImportants,
  setIsFiltredImportants,
}) => {
  return (
    <View style={styles.container}>
      <Button text={'Добавить'} onClick={openForm} />
      <Filter
        isActiveFilter={isFiltredImportants}
        setIsActiveFilter={setIsFiltredImportants}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: 'center',
  },
});

export default HeaderListTasks;

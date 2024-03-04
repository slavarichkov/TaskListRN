import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

import Checkbox from '../commonComponents/checkboxs/Checkbox';

interface Props {
  isActiveFilter: boolean;
  setIsActiveFilter: () => void;
}

const Filter: FC<Props> = ({isActiveFilter, setIsActiveFilter}) => {
  return (
    <View style={styles.container}>
      <Checkbox
        text={'Показать только Важные'}
        isChecked={isActiveFilter}
        setChecked={setIsActiveFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: 'relative',
    padding: 25,
    width: '100%',
    height: 'auto',
    maxWidth: 500,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
  },
});

export default Filter;

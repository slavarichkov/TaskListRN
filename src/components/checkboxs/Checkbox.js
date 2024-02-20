import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme/ThemeContext';

const Checkbox = ({ text, isChecked, setChecked }) => {

  const { colorText, theme } = useTheme();

  const handleToggle = () => {
    setChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, { borderColor: theme === 'light' ? 'black' : 'white' }, isChecked && styles.checkedCheckbox]}
        onPress={handleToggle}
      />
      <Text style={[styles.text, colorText]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 300,
  },
  text: {
    color: 'rgba(0,0,0,1)',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
  },
  checkedCheckbox: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
});

export default Checkbox;



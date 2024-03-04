import React, { useEffect, useRef } from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from '../../../contexts/theme/ThemeContext';

type KeyboardType =
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search';

type ReturnKeyType =
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send';

interface TypesTextInputWithLabelInside {
    label?: string,
    placeholder?: string,
    value: string | number,
    onChangeText: (value: string) => void,
    onClickInput?: () => void,
    maxLength?: number,
    placeholderTextColor?: string,
    keyboardType?: KeyboardType,
    editable?: boolean,
    multiline?: boolean,
    numberOfLines?: number,
    onFocus?: any,
    forwardedRef?: React.MutableRefObject<HTMLInputElement | null>,
    handleInputSubmit?: () => void,
    returnKeyType?: ReturnKeyType,
    onClickInfo?: () => void,
    dateReading?: string,
    styleColorText?: string,
}

const TextInputWithLabelInside: React.FC<TypesTextInputWithLabelInside> = ({
    label,
    placeholder,
    value,
    onChangeText,
    onClickInput,
    maxLength,
    keyboardType,
    editable,
    multiline,
    numberOfLines,
    onFocus,
    forwardedRef,
    handleInputSubmit,
    returnKeyType,
    styleColorText,
}) => {
    let inputRef = useRef(null);

    const { colorText, theme } = useTheme();

    useEffect(() => {
        // Прокидываем ref из пропс в локальный ref
        if (forwardedRef !== undefined) {
            forwardedRef.current = inputRef.current;
        }
    }, [forwardedRef]);

    const onPressInput = () => {
        if (!onClickInput) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } else {
            onClickInput();
        }
    };
    
    return (
        <TouchableOpacity onPress={onPressInput} style={styles.containerInput}>
            {label !== '' ?
                <Text style={[styles.label, colorText]}>{label}</Text>
                : <></>}
            <TextInput
                ref={inputRef}
                style={[styles.input, styleColorText ? { color: styleColorText } : colorText]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={ theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
                maxLength={maxLength}
                keyboardType={keyboardType ? keyboardType : "default"}
                editable={editable}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onFocus={onFocus}
                disableFullscreenUI={true}
                returnKeyType={returnKeyType ? returnKeyType : 'done'}
                onSubmitEditing={handleInputSubmit ? handleInputSubmit : () => { }} // самбит при нажатии кнопки на клавиатуре при активном инпуте
            />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    containerInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        marginVertical: 5,
        paddingVertical: 3,
    },
    input: {
        fontSize: 14,
        padding: 0,
        margin: 0,
        textAlign: 'left',
    },
    label: {
        fontSize: 14,
    },
})

export default TextInputWithLabelInside;
import { BlurView } from '@react-native-community/blur';
import { useEffect, useState } from "react";
import { Modal, View, TouchableOpacity, Image, TextInput } from "react-native";
import apiUser from '../../../services/apiUser.ts';
import { saveToken, saveUserId } from '../../../utils/secureStoreFunctions.js';

import styles from "../FormSignIn/styles/styles.js"
import { regexEmailEn, regexPassword, regexStrokeInput } from "../../../utils/regex.js";

import imgArrow from "../../../assets/images/close-svgrepo-com.png";
import { getDeviceId } from '../../../utils/asyncStoreFunctions.ts';
import TextInputWithLabelInside from '../../commonComponents/Inputs/TextInputWithLableAndValidation.tsx';
import Button from '../../commonComponents/buttons/Button.tsx';

function FormSignUp({ visible, onClose, handleSubmit }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    //Валидация
    const [isValidForm, setIsValidForm] = useState(false);
    //Лоадеры
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

    async function onSubmit() {
        try {
            if (isValidForm) {
                setIsLoadingSignUp(true);
                const idDevice = await getDeviceId();
                const info = await apiUser.signUp(name, email, password, idDevice)
                const token = info.token;
                await saveToken(token);
                await saveUserId(info.userId)
                setIsLoadingSignUp(false);
                handleSubmit();
                close();
            }
        }
        catch (error) {
            setIsLoadingSignUp(false);
            setValidationAccess('Ошибка при регистрации')
        }
    }

    function close() {
        onClose();
    }

    function validation(value, regex) {
        const isValue = value === '' ? false : true;
        const isRegex = regex.test(value);

        if (isValue && isRegex) {
            return true;
        } else {
            return false;
        }
    }

    //Валидация
    useEffect(() => {
        if (validation(password, regexPassword) && validation(email, regexEmailEn) && validation(name, regexStrokeInput)) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    }, [email, password])

    return (
        <View>
            <Modal visible={visible} animationType={'slide'} transparent={true} onRequestClose={close}>
                <BlurView style={styles.blur} intensity={10} blurType='light' />
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                        <Image source={imgArrow} style={styles.imgButtonClose} />
                    </TouchableOpacity>
                    <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInputWithLabelInside
                            label={'имя'}
                            placeholder={'Введите имя'}
                            value={name}
                            onChangeText={setName}
                            keyboardType={'default'}
                        />
                        <TextInputWithLabelInside
                            label={'email'}
                            placeholder={'Введите email'}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType={'email-address'}
                        />
                        <TextInputWithLabelInside
                            label={'пароль'}
                            placeholder={'Введите пароль'}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <View style={{ paddingTop: 10 }}>
                            <Button
                                onClick={onSubmit}
                                text={'Регистрация'}
                                disabled={!isValidForm}
                                isLoading={isLoadingSignUp}
                            />
                        </View>
                    </View>
                </View>
            </Modal >
        </View>
    )
}



export default FormSignUp;
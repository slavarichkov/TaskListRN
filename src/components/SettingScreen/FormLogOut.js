import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ModalWithChildren from "../../modals/ModalWithChildren";

function FormLogOut({ isOpenFormSignOut, closeFormSignOut, logOut, theme}) {


    return (
        <ModalWithChildren
            isVisible={isOpenFormSignOut}
            onClose={closeFormSignOut}
            theme={theme}
            childComponent={
                <View style={styles.containerFormSignOut}>
                    <Text style={styles.titleFormSignOut}>{'Выйти'}</Text>
                    <View style={styles.containerButtonFormSignOut}>
                        <TouchableOpacity onPress={logOut}>
                            <Text style={styles.textButtonFormSignOut}>{'Да'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeFormSignOut}>
                            <Text style={styles.textButtonFormSignOut}>{'Нет'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            isHiddeButtonUpdateAndRemove={true}
        />
    )
}

const styles = StyleSheet.create({
    containerFormSignOut: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 30,
    },
    titleFormSignOut: {
        color: 'rgba(0,0,0,1)',
        fontWeight: '500',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    containerButtonFormSignOut: {
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,
    },
    textButtonFormSignOut: {
        color: 'rgba(0,0,0,1)',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default FormLogOut;
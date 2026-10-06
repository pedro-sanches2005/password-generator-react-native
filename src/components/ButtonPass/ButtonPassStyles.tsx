import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#007c57',
    },
    buttonPressed: {
        backgroundColor: '#f2b705',
    },
    text: {
        fontSize: 16,
        color: 'white',
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
    },
    lengthInput: {
        width: '100%',
        backgroundColor: '#cfcdcd',
        color: '#000',
        fontSize: 18,
        marginVertical: 5,
        borderRadius: 5,
        borderColor: '#006c4c',
        borderWidth: 2,
        textAlign: 'center',
    },
    options: {
        marginTop: 8,
        marginBottom: 4,
    },
    error: {
        color: '#ffb4b4',
        fontSize: 14,
        marginTop: 6,
        textAlign: 'center',
    },
});

import { StyleSheet } from "react-native";


const s = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        height: 115,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        borderRadius: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20,
    },
    title: {
        fontSize: 25,
    },
    check: {
        height: 25,
        width: 25,
    }
});

export default s;
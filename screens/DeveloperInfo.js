import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../constants/styles";
import Unorderedlist from 'react-native-unordered-list';

export default function DeveloperInfoScreen()
{
    return (
        
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.text}>
                This app is developed in the process of learning the course React-Native.
                This prototype is inspired by the app "Expensify".
            </Text>
            <View style={styles.innerContainer}>
                <Text style={styles.text}>How to use :</Text>

                <Unorderedlist color={Colors.primary100} style={{ fontSize: 50 }}>
                    <Text style={styles.text}>
                        You can click the '+' icon at the top right to start adding your expenses.
                    </Text>
                </Unorderedlist>

                <Unorderedlist color={Colors.primary100} style={{ fontSize: 50 }}>
                    <Text style={styles.text}>
                    All the expenses which you spend in the last 7 days can be viewed on the Recent expenses tab.
                    </Text>
                </Unorderedlist>

                <Unorderedlist color={Colors.primary100} style={{ fontSize: 50 }}>
                    <Text style={styles.text}>
                    You can edit the expense details by clicking on that particular epense and update the expense.
                    </Text>
                </Unorderedlist>

                <Unorderedlist color={Colors.primary100} style={{ fontSize: 50 }}>
                    <Text style={styles.text}>
                    To delete an expense just click on the expense item and click the delete icon below.
                    </Text>
                </Unorderedlist>

                <Unorderedlist color={Colors.primary100} style={{ fontSize: 50 }}>
                    <Text style={styles.text}>
                    To logout of the app click the exit icon at the top left.
                    </Text>
                </Unorderedlist>
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.text} >Developer Details:</Text>
                <Text style={styles.text} >For any queries please contact: </Text>
                <Text style={styles.text} >email : abhiramgat@gmail.com</Text>
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        paddingVertical:32,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.primary700,  
    },
    text:
    {
        color: Colors.primary100,
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        margin:4,
    },
    innerContainer:
    {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 32,
    }
})
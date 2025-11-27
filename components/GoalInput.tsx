import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState, useRef } from 'react';
import { useGoals } from '../context/GoalsContext';

type GoalInputProps = {
  visible: boolean;
  onCancel: () => void;
};

const GoalInput = (props: GoalInputProps) => {
    const [enteredGoalText, setEnteredGoalText] = useState<string>('');
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);
    const { addGoal } = useGoals();

    function goalInputHandler(enteredText: string) {
        setEnteredGoalText(enteredText);
        if (enteredText.trim().length > 0) {
            setIsInvalid(false);
        }
    }

    function addGoalHandler() {
        const trimmedText = enteredGoalText.trim();
        if (trimmedText.length === 0) {
            setIsInvalid(true);
            inputRef.current?.focus();
            return;
        }
        addGoal(trimmedText);
        setEnteredGoalText('');
        props.onCancel();
    }

    return (
    <Modal
        visible={props.visible}
        transparent={true}
        animationType="fade"
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Image 
                    source={require('../assets/images/goal.png')} 
                    style={styles.logo} 
                    resizeMode="contain"
                />
                <TextInput
                    ref={inputRef}
                    placeholder='Set your goal ...'
                    placeholderTextColor={isInvalid ? '#ff9999':'#888'}
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                    style={[
                        styles.input,
                        isInvalid && styles.invalidInput
                    ]}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.addButton]}
                        onPress={addGoalHandler}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={props.onCancel}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
    )
}

export default GoalInput

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    logo: {
        width: 64,
        height: 64,
        marginBottom: 15,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    invalidInput: {
        borderColor: '#ff9999',
        backgroundColor: '#ffdddd'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 10,
        marginTop: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 5,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    addButton: {
        backgroundColor: '#5e08cc',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    addButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '500',
        fontSize: 16,
    }
});
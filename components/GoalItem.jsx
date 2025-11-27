import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';


const GoalItem = (props) => {

    const handleToggleComplete = () => {
        if (props.onToggleComplete) {
            props.onToggleComplete(props.id);
        }
    };

  return (
    <View 
      style={[
        styles.goalItem,
        props.isCompleted && styles.completedItem
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.goalText, props.isCompleted && styles.completedText]}>
          {props.text}
        </Text>
        {!props.isCompleted && (
          <Pressable 
            onPress={handleToggleComplete}
            style={[styles.checkbox, props.isCompleted && styles.checked]}
          >
            <Text style={styles.checkmark}>✓</Text>
          </Pressable>
        )}
      </View>
      <Pressable 
        onPress={() => props.onDeleteItem(props.id)}
        style={({pressed}) => pressed && styles.pressedItem}
      >
        <Text style={styles.deleteButton}>✕</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fffef3ff',
    padding: 12,
    marginVertical: 6,
    marginLeft:1,
    marginRight:2,
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkmark: {
    fontSize: 16,
    color: '#02aa5eff',
  },
  deleteButton: {
    color: '#ff6b6b',
    fontSize: 18,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  pressedItem: {
    opacity: 0.7,
  },
  completedItem: {
    opacity: 0.6,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checked: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00bcd4',
  },
});

export default GoalItem;
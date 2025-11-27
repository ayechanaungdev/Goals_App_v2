import { View, Text, StyleSheet, FlatList, TouchableOpacity  } from 'react-native'
import React from 'react'
import { useGoals } from "../../context/GoalsContext";
import  GoalItem  from '../../components/GoalItem';
import Header from '../../components/Header';
import { useRouter } from 'expo-router';

const Completed = () => {
  const router = useRouter();
  const {goals, deleteGoal, toggleGoalCompletion, clearCompletedGoals } = useGoals();
  const completedGoals = goals.filter(goal => goal.isCompleted);

  const handleClearAll = () => {
    clearCompletedGoals();
  }

  return (
    <>
    <Header
      title="My Goals"
      onAboutPress={() => router.push('/about')}
    />
    <View style={styles.container}>
      <View style={styles.goalsHeader}>
        <Text style={styles.sectionTitle}>Your Completed Goals</Text>
        <TouchableOpacity
          style={styles.clearAllButton}
          onPress={handleClearAll}
        >
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={completedGoals}
        renderItem={({item}) => (
          <GoalItem
            id={item.id}
            text={item.text}
            isCompleted = {item.isCompleted}
            onDeleteItem = {deleteGoal}
            onToggleComplete={toggleGoalCompletion}
          />
        )}
        keyExtractor={ (item) => item.id}
        ListEmptyComponent = {
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No completed goals yet</Text>
          </View>
        }

      />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
    goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  clearAllButton: {
    backgroundColor: '#bdb19fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },
  clearAllText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
})

export default Completed
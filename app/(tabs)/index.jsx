import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable, Image } from 'react-native';
import { useState } from 'react';
import GoalInput from '../../components/GoalInput';
import GoalItem from '../../components/GoalItem';
import { useGoals } from '../../context/GoalsContext';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { goals, deleteGoal, toggleGoalCompletion } = useGoals();

  const activeGoals = goals.filter(goal => !goal.isCompleted);
  
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }


  return (
    <View style={styles.appContainer}>
      <Header
        title="My Goals"
        onAboutPress={() => router.push('/about')}
      />

      <View style={styles.contentContainer}>
        <View style={styles.goalsHeader}>
          <Text style={styles.sectionTitle}>Set Your Goals</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={startAddGoalHandler}
          >
            <Text style={styles.addButtonText}>+ Add Goal</Text>
          </TouchableOpacity>
        </View>

        {modalIsVisible && <GoalInput
          visible={modalIsVisible}
          onCancel = {endAddGoalHandler}
        />}

        <View style={styles.goalsContainer}>
          {activeGoals.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No goals yet!</Text>
              <Text style={styles.emptySubtext}>Add your first goal to get started</Text>
            </View>
          ) : (
            <FlatList
              data={activeGoals}
              renderItem={({item}) => (
                <GoalItem
                  text={item.text}
                  id={item.id}
                  isCompleted = {item.isCompleted}
                  onDeleteItem={deleteGoal}
                  onToggleComplete={toggleGoalCompletion}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.goalsList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  contentContainer: {
    flex: 1,
    padding: 20,
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
  addButton: {
    backgroundColor: '#5e08cc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  goalsContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  goalsList: {
    paddingBottom: 10,
  },
});

export default Home;
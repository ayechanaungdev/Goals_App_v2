import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Goal = {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: number;
};

type GoalsContextType = {
  goals: Goal[];
  addGoal: (text: string) => void;
  deleteGoal: (id: string) => void;
  toggleGoalCompletion: (id: string) => void;
  clearCompletedGoals: () => void;
};

const STORAGE_KEY = 'test';

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider = ({ children }: { children: ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // load stored goals
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem(STORAGE_KEY);
        if(storedGoals) {
          setGoals(JSON.parse(storedGoals));
        }
      } catch (error) {
        console.error('Failed to load goals', error)
      }
      finally {
        setIsLoading(false);
      }
    };

    loadGoals();
  }, []);

  // save goals to storage whenever they change
  useEffect(() => {
    if(!isLoading) {
      const saveGoals = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
        } catch (error) {
          console.error('Failed to save goals',error);
        }
      };
      saveGoals();
    }
  },[goals, isLoading]);


  const addGoal = (text: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      text,
      isCompleted: false,
      createdAt: Date.now()
    };
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const deleteGoal = (id: string) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  const toggleGoalCompletion = (id: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal
      )
    );
  };

  // clear all 'completed goals'
  const clearCompletedGoals = () => {
    setGoals(prevGoals => prevGoals.filter(goal=> !goal.isCompleted))
  }

  // loading
  if (isLoading) {
    return null;
  }

  return (
    <GoalsContext.Provider
      value={{ goals, addGoal, deleteGoal, toggleGoalCompletion, clearCompletedGoals }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};
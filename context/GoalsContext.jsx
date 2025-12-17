import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Toast from "react-native-toast-message";

const STORAGE_KEY = "test";

const GoalsContext = createContext(undefined);

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // load stored goals
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedGoals) {
          setGoals(JSON.parse(storedGoals));
        }
      } catch (error) {
        console.error("Failed to load goals", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGoals();
  }, []);

  // save goals to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      const saveGoals = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
        } catch (error) {
          console.error("Failed to save goals", error);
        }
      };
      saveGoals();
    }
  }, [goals, isLoading]);

  const addGoal = (text) => {
    const newGoal = {
      id: Date.now().toString(),
      text,
      isCompleted: false,
      createdAt: Date.now(),
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    Toast.show({ type: "success", text1: "Goal added" });
  };

  const deleteGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    Toast.show({ type: "success", text1: "Goal deleted" });
  };

  const toggleGoalCompletion = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, isCompleted: !goal.isCompleted } : goal
      )
    );
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      const newStatus = !goal.isCompleted;
      Toast.show({
        type: "success",
        text1: newStatus ? "Goal is set 'completed'" : "Goal marked as pending",
      });
    }
  };

  // clear all 'completed goals'
  const clearCompletedGoals = () => {
    const completedCount = goals.filter((goal) => goal.isCompleted).length;
    setGoals((prevGoals) => prevGoals.filter((goal) => !goal.isCompleted));
    if (completedCount > 0) {
      Toast.show({
        type: "success",
        text1: "All completed goal(s) cleared",
      });
    } else {
      Toast.show({ type: "info", text1: "No completed goals to clear" });
    }
  };

  // loading
  if (isLoading) {
    return null;
  }

  return (
    <GoalsContext.Provider
      value={{
        goals,
        addGoal,
        deleteGoal,
        toggleGoalCompletion,
        clearCompletedGoals,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
};

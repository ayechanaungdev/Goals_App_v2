import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { GoalsProvider } from "../context/GoalsContext";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <>
      <GoalsProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="about" />
        </Stack>
      </GoalsProvider>
      <Toast position="bottom" bottomOffset={120} visibilityTime={1200} />
    </>
  );
};

export default RootLayout;

import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { GoalsProvider } from '../context/GoalsContext'

const RootLayout = () => {
  return (
    <>
      <GoalsProvider>
        <StatusBar style='auto'/>
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='about' />
        </Stack>
      </GoalsProvider>
    </>
  )
}

export default RootLayout
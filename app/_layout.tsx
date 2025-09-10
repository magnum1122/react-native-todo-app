import { Stack } from "expo-router";
import './global.css'
import TodoProvider from './Context/todoContext'

export default function RootLayout() {
  return (
  <TodoProvider>
  <Stack screenOptions={{headerShown: false}}/>
  </TodoProvider>
  );
}

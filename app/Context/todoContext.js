import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const jasonValue = await AsyncStorage.getItem("@todos");
      if (jasonValue != null) setTodos(JSON.parse(jasonValue));
    } catch (e) {
      console.error(`Failed to add todos`, e);
    }
  };

  const saveTodos = async () => {
    try {
      const jasonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("@todos", jasonValue);
    } catch (e) {
      console.error(`Failed to save todo`, e);
    }
  };

  const addTodo = (title, body) => {
    const newTodo = {
      id: Date.now(),
      title,
      body,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newTitle, newBody) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, body: newBody } : todo
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, editTodo, toggleComplete }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
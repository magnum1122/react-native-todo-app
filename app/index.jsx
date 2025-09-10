import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Checkbox from "expo-checkbox";
import { useContext, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TodoContext } from "./Context/todoContext";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { todos, addTodo, deleteTodo, editTodo, toggleComplete } =
    useContext(TodoContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const openModalForNew = () => {
    setEditingTodo(null);
    setTitle("");
    setBody("");
    setModalVisible(true);
  };

  const openModalForEdit = (todo) => {
    if (todo && todo.id) {
      setEditingTodo(todo);
      setTitle(todo.title);
      setBody(todo.body);
      setModalVisible(true);
    }
  };

  const handleSave = () => {
    if (editingTodo && editingTodo.id) {
      editTodo(editingTodo.id, title, body);
    } else {
      addTodo(title, body);
    }
    setModalVisible(false);
    setTitle("");
    setBody("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        className="flex-1 bg-todo-lightBlue"
      >
        <View className="my-4">
          <Text className="text-todo-darkBlue font-bold text-5xl self-center">
            Check It
          </Text>
        </View>

        {/* Adding Flatlist */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              key={item.id}
              className="flex-row bg-todo-mediumBrightBlue p-4 rounded-xl my-1 mx-3 justify-between"
            >
              <View className="flex-row gap-3">
                <View className="m-4">
                  <Checkbox
                    className="p-2"
                    value={item.completed}
                    onValueChange={() => toggleComplete(item.id)}
                    color={item.completed ? "#122B68" : "#122B68"}
                  />
                </View>
                <View className="flex">
                  <Text className="text-todo-darkBlue text-xl font-semibold">
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-todo-darkBlue text-x"
                  >
                    {item.body}
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity onPress={() => openModalForEdit(item)}>
                  <Feather name="edit" size={30} color="#122B68" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                  <MaterialIcons name="delete" size={30} color="#122B68" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Add todo button */}
        <TouchableOpacity
          className="absolute bottom-[60] right-[20] elevation-sm justify-center items-center"
          onPress={openModalForNew}
        >
          <Image
            source={require("../assets/images/add.png")}
            className="size-[65]"
          />
        </TouchableOpacity>

        {/* Add Todo Modal */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View className="flex-1 pt-16 bg-gray-900/80 ">
            <View className="bg-todo-mediumBrightBlue my-4 mx-3 border-2 border-todo-darkBlue elevation-md rounded-xl">
              <View className="m-2 p-2">
                <Text className="text-todo-darkBlue font-bold text-4xl pl-2 mb-3 self-center">
                  To-Do
                </Text>
                <Text className="text-todo-darkBlue text-xl pl-2 mb-1">
                  Title:
                </Text>
                <TextInput
                  className="text-todo-darkBlue border-2 border-todo-darkBlue elevation-sm rounded-2xl bg-todo-lightBlue text-xl px-2 mb-2"
                  placeholder="Enter title"
                  cursorColor={"#384959"}
                  placeholderTextColor={"grey"}
                  value={title}
                  onChangeText={setTitle}
                />

                <Text className="text-todo-darkBlue text-xl pl-2 mb-1">
                  Description:
                </Text>
                <TextInput
                  className="text-todo-darkBlue border-2 border-todo-darkBlue elevation-sm rounded-2xl h-28 bg-todo-lightBlue text-xl px-2"
                  placeholder="Describe the work"
                  textAlignVertical="top"
                  cursorColor={"#384959"}
                  placeholderTextColor={"grey"}
                  value={body}
                  onChangeText={setBody}
                  multiline={true}
                  numberOfLines={5}
                />
                <TouchableOpacity
                  onPress={handleSave}
                  className="my-2 items-center"
                >
                  <View className="bg-todo-darkBlue mt-3 justify-center w-1/3 items-center p-1 rounded-xl elevation-sm gap-1">
                    <Text className="text-white text-2xl p-1.5 font-semibold">
                      Save
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <StatusBar backgroundColor="#BDDDFC" barStyle={"light-content"} />
      </View>
    </KeyboardAvoidingView>
  );
}

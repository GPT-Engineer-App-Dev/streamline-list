import { useState } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, Checkbox } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input placeholder="Add a new task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
        <Button leftIcon={<FaPlus />} ml={2} colorScheme="blue" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center">
            <Checkbox icon={<MdRadioButtonUnchecked />} checkedIcon={<MdCheckCircle />} isChecked={task.isCompleted} onChange={() => handleToggleTaskCompletion(task.id)} mr={2} />
            <Box flex="1" as={task.isCompleted ? "s" : "span"}>
              {task.text}
            </Box>
            <IconButton icon={<FaTrash />} aria-label="Delete task" onClick={() => handleDeleteTask(task.id)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;

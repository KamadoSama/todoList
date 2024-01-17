import React,{useState} from 'react'
import { Button, View } from 'react-native';
import { AddTaskModal } from '../components';
const AddScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowModal(false); // Close the modal after adding the task
  };
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={() => setShowModal(true)} title="Go back home" />
          {showModal && <AddTaskModal onAddTask={handleAddTask} />}
        </View>
      );
  
}

export default AddScreen
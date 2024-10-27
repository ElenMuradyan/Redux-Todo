import { Flex } from "antd";
import ToDoList from "./components/ToDoList";
import './styles/global.css';

function App() {
  return (
    <Flex className="App" justify="center" align="flex-start">
      <ToDoList />
    </Flex>
  );
}

export default App;

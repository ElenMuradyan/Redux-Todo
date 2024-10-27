import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToDo, deleteToDo, changeCompletedState } from "../../redux/features/todoList/todoListSlice";
import { VISIBILITY_FILTERS } from "../../core/utilis/constants";
import getTodosByVisibilityFilter from "../../redux/selectors";
import { Button, Checkbox, Flex, Input, Typography, notification, theme } from "antd";

import './index.css';

const { Title } = Typography;

const ToDoList = () => {
    const allTodos = useSelector((state) => state.todoList.value);
    const dispatch = useDispatch();

    const [ inputValue, setInputValue ] = useState('');
    const [ visibilityFilter, setVisibilityFilter ] = useState(VISIBILITY_FILTERS.ALL);
    const [ dislayedToDos, setDisplayedTodos ] = useState(getTodosByVisibilityFilter(allTodos,visibilityFilter))

    useEffect(() => {
        setDisplayedTodos(getTodosByVisibilityFilter(allTodos,visibilityFilter));
    },[allTodos,visibilityFilter])

    const handleInputChange = e => {
        setInputValue(e.target.value.trim());
    };

    const handleAddToDo = () => {
        if(!inputValue){
            notification.error({
                message:'Please enter todo name'
            })
            return;
        };

        dispatch(addToDo(inputValue));
        setInputValue('');
    };

    const handleKeyDown = event =>{
        if (event.key === 'Enter'){
            handleAddToDo();
        }
        };

    return(
        <Flex align="center" justify="center" gap={30} vertical className="todoList_container">
           <Title style={{
            background: 'linear-gradient(90deg, #ffd700, #ffcc00, #ffdb58)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', 
            fontSize: '3rem', 
            }}>Redux Todo List</Title>
            <Input placeholder="Pleace enter todo name" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
            <button onClick={handleAddToDo} className="Button"
            style={{
                boxShadow: '0px 4px 12px rgba(24, 144, 255, 0.5)'
            }}>
            Add Todo</button>
            {dislayedToDos.map((item,index)=>{
                const todoindex = item.index;
                return(
                    <Flex key={todoindex} className="todo" align="center" justify="space-between">
                    <Title level={4} style={{ 
                    background: 'linear-gradient(90deg, #1900ff, #ff08fb)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    display: 'inline-block', 
                    margin: 0,
                    fontWeight: 'bold', 
                    }}>{item.name}</Title>
                    <Checkbox checked={item.completed} onChange={() => dispatch(changeCompletedState(todoindex))} style={{color:'white'}}>{item.completed ? 'Completed' : 'Not Completed'}</Checkbox>
                    <button className="Button" onClick={() => dispatch(deleteToDo(index))}>Delete</button>
                    </Flex>
                )
            })}
            <Flex className="Buttons" justify="space-between" align="center">
            <button className="Button" onClick={()=>setVisibilityFilter(VISIBILITY_FILTERS.COMPLETED)}
                style={{
                    boxShadow: visibilityFilter === VISIBILITY_FILTERS.COMPLETED ? '5px 4px 8px rgba(24, 144, 255, 0.5)' : undefined
                }}
                >Completed</button>
            <button className="Button" onClick={()=>setVisibilityFilter(VISIBILITY_FILTERS.ALL)} 
            style={{
                boxShadow: visibilityFilter === VISIBILITY_FILTERS.ALL ? '5px 4px 8px rgba(24, 144, 255, 0.5)' : undefined
            }}>
                All</button>
            <button className="Button" onClick={()=>setVisibilityFilter(VISIBILITY_FILTERS.INCOMPLETE)}
                style={{
                    boxShadow: visibilityFilter === VISIBILITY_FILTERS.INCOMPLETE ? '5px 4px 8px rgba(24, 144, 255, 0.5)' : undefined
                }}
                >Inompleted</button>
            </Flex>
        </Flex>
    )
}

export default ToDoList
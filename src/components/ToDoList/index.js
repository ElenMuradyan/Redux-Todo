import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToDo, deleteToDo, changeCompletedState } from "../../redux/features/todoList/todoListSlice";
import { VISIBILITY_FILTERS } from "../../core/utilis/constants";
import getTodosByVisibilityFilter from "../../redux/selectors";
import { Button, Checkbox, Flex, Input, Typography, message, notification, theme } from "antd";
import { retry } from "@reduxjs/toolkit/query";

const { Title } = Typography;

const ToDoList = () => {
    const theme = {
        token: {
            colorPrimary: '#1DA57A',
        },
    };
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
        <Flex align="center" justify="center" gap={30} vertical>
            <Title>Redux Todo List</Title>
            <Input placeholder="Pleace enter todo name" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
            <Button type='primary' onClick={handleAddToDo}>Add Todo</Button>
            {dislayedToDos.map((item,index)=>{
                const todoindex = item.index;
                return(
                    <Flex key={todoindex} className="todo" align="center" justify="space-between">
                    <Title level={5}>{item.name}</Title>
                    <Checkbox checked={item.completed} onChange={() => dispatch(changeCompletedState(todoindex))}>{item.completed ? 'Completed' : 'Not Completed'}</Checkbox>
                    <Button type='primary' onClick={() => dispatch(deleteToDo(index))}>Delete</Button>
                    </Flex>
                )
            })}
            <Flex>
            <Button type='primary' onClick={()=>setVisibilityFilter(VISIBILITY_FILTERS.ALL)} 
                style={{
                    boxShadow: visibilityFilter === VISIBILITY_FILTERS.ALL ? '0 4px 8px rgba(24, 144, 255, 0.5)' : undefined
                }}>
                    All</Button>
            <Button type='primary' onClick={()=>setVisibilityFilter(VISIBILITY_FILTERS.COMPLETED)}
                style={{
                    boxShadow: visibilityFilter === VISIBILITY_FILTERS.COMPLETED ? '0 4px 8px rgba(24, 144, 255, 0.5)' : undefined
                }}
                >Completed</Button>
            <Button type='primary' onClick={()=>setVisibilityFilter(VISIBILITY_FILTERS.INCOMPLETE)}
                style={{
                    boxShadow: visibilityFilter === VISIBILITY_FILTERS.INCOMPLETE ? '0 4px 8px rgba(24, 144, 255, 0.5)' : undefined
                }}
                >Not Completed</Button>
            </Flex>
        </Flex>
    )
}

export default ToDoList
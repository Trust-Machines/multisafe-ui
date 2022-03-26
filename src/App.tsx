import React from 'react';
import {useAtom} from "jotai";
import {useState} from "react";
import {todosAtom, themeAtom} from "./atoms";

function AddTodo() {
    const [todos, setTodos] = useAtom(todosAtom);
    const [value, setValue] = useState("");

    return <div style={{padding: "20px"}}>
        <p>Add Todo</p>
        <input value={value} onChange={(e) => {
            setValue(e.target.value)
        }}/>
        <button onClick={() => {
            const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
            setTodos([...todos, {id, title: value, done: false}])
        }}>Add
        </button>
    </div>;
}

function TodoList() {
    const [todos, setTodos] = useAtom(todosAtom);
    return <>
        {todos.map(t => {
            return <div className="todo">
                <small>id: {t.id} </small>
                {t.title}
                {t.done ? <>✅</> : ""}
                {!t.done && <>
                    <button onClick={() => {
                        const newTodos = todos.map(x => {
                            return {
                                ...x,
                                done: x.id === t.id ? true : x.done
                            }
                        })

                        setTodos([...newTodos]);
                    }}>done
                    </button>
                </>}
            </div>
        })}
    </>
}


function App() {
    const [theme, setTheme] = useAtom(themeAtom);
    return (
        <>
            <div className="App">

                <p>
                    Theme: {theme}
                    <button onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark")
                    }}>Toggle theme
                    </button>
                </p>
                <AddTodo/>
                <TodoList/>
            </div>
        </>
    );
}

export default App;

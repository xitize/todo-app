import "./App.css";
import ButtonAddTodo from "./component/ButtonAddTodo";
import InputTodo from "./component/InputTodo";
import ListTodo from "./component/ListTodo";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./store/taskStore";
import { useState } from "react";
import { Container, Snackbar, Stack, Typography } from "@mui/material";

function App() {
  const [inputText, setInputText] = useState("");
  const [showSnack, setShowSnack] = useState(false);
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Container maxWidth={"sm"}>
      <Typography
        variant="subtitle1"
        style={{
          textAlign: "center",
          margin: 24,
          font: "status-bar",
          fontSize: 23,
          color: "slateblue"
        }}
      >
        Todo App
      </Typography>
      <Stack direction={"row"} spacing={2} style={{ marginBottom: 32 }}>
        <InputTodo inputText={inputText} setInputText={setInputText} />
        <ButtonAddTodo
          handleAdd={() => {
            if (inputText.length === 0) {
              setShowSnack(true);
              return;
            }
            dispatch(addTask({ title: inputText }));
            setInputText("");
          }}
        />
      </Stack>
      <ListTodo
        todos={todos.slice().reverse()}
        setInputText={setInputText}
        inputText={inputText}
      />
      <Snackbar
        open={showSnack}
        autoHideDuration={2000}
        onClose={() => {
          setShowSnack(false);
        }}
        message="Failed to add, please add something to add todo"
      />
    </Container>
  );
}

export default App;

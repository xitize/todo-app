import { useDispatch } from "react-redux";
import { addTask } from "../store/taskStore";
import { TextField } from "@mui/material";

const InputTodo = ({ inputText, setInputText }) => {
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  return (
    <>
      <TextField
        variant="outlined"
        aria-label="Todo"
        style={{ flex: 1 }}
        value={inputText}
        onChange={handleInput}
        placeholder="Todo.."
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(addTask({ title: inputText }));
            setInputText("");
          }
        }}
      />
    </>
  );
};

export default InputTodo;

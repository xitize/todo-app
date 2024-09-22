import { useDispatch } from "react-redux";
import {
  deleteTask,
  markTaskToggle,
  isEditable,
  saveTask
} from "../store/taskStore";
import { Button, Checkbox, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

const ListTodos = ({ todos }) => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const editEnabledIdRef = useRef(null);

  function handleSave(item) {
    dispatch(saveTask({ id: item.id, title: editText }));
    dispatch(isEditable({ id: item.id, isEditable: false }));
  }

  return (
    <>
      {todos.map((item) => {
        return (
          <Stack direction={"row"} key={item.id} spacing={2} padding={1}>
            <Checkbox
              aria-label={"label " + item.title}
              checked={item.completed}
              onChange={() => {
                console.log("item id " + item.id);
                dispatch(markTaskToggle({ id: item.id }));
              }}
            />
            {item.editable ? (
              <TextField
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSave(item);
                  }
                }}
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                }}
                onDoubleClick={() => {
                  dispatch(isEditable({ id: item.id, editable: false }));
                }}
                variant={"outlined"}
                placeholder={item.completed ? <s>{item.title}</s> : item.title}
                style={{
                  flex: 1,
                  alignSelf: "center"
                }}
              />
            ) : (
              <Typography
                variant="subtitle2"
                style={{
                  flex: 1,
                  alignSelf: "center",
                  fontSize: 16,
                  paddingLeft: 12
                }}
                onDoubleClick={() => {
                  if (editEnabledIdRef.current) {
                    dispatch(
                      isEditable({
                        id: editEnabledIdRef.current,
                        editable: false
                      })
                    );
                  }
                  dispatch(isEditable({ id: item.id, editable: true }));
                  editEnabledIdRef.current = item.id;
                  setEditText(item.title);
                }}
              >
                {item.completed ? <s>{item.title}</s> : item.title}
              </Typography>
            )}
            {item.editable ? (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  handleSave(item);
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  dispatch(deleteTask({ id: item.id }));
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        );
      })}
    </>
  );
};

export default ListTodos;

import { useDispatch } from "react-redux";
import {
  deleteTask,
  markTaskToggle,
  isEditable,
  saveTask
} from "../store/taskStore";
import { Button, Checkbox, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ListTodos = ({ todos }) => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");

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
                  alignSelf: "center"
                }}
                onDoubleClick={() => {
                  // setEnableEdit(!enableEdit);
                  dispatch(isEditable({ id: item.id, editable: true }));
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
                  dispatch(saveTask({ id: item.id, title: editText }));
                  dispatch(isEditable({ id: item.id, isEditable: false }));
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

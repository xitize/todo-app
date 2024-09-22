import { Button } from "@mui/material";
import { memo } from "react";

const ButtonAddTodo = ({ handleAdd }) => {
  return (
    <>
      <Button variant="outlined" onClick={handleAdd}>
        Add
      </Button>
    </>
  );
};

export default memo(ButtonAddTodo);

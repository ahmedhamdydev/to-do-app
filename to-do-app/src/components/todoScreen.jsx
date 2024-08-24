import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Box, TextField, Button, Divider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./todoCard";

const BoardWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  padding: "30px",
  backgroundColor: "#f0f0f5",
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const TaskContainer = styled("div")(() => ({
  minHeight: "120px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fefefe",
  border: "2px solid #dcdcdc",
  minWidth: "280px",
  maxWidth: "280px",
  borderRadius: "12px",
  padding: "20px",
  margin: "0 10px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const ColumnWrapper = styled("div")(() => ({
  margin: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "280px",
  minHeight: "50vh",
  backgroundColor: "#f5f5fa",
  borderRadius: "15px",
  boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.05)",
}));

const Header = styled("span")(() => ({
  fontFamily: "'Roboto Slab', serif",
  fontWeight: "700",
  color: "#34495e",
  fontSize: "28px",
  marginBottom: "16px",
  textAlign: "center",
  letterSpacing: "1px",
  textTransform: "capitalize",
  padding: "8px 16px",
  borderRadius: "8px",
  backgroundColor: "#eaeaea",
}));

const initialData = {
  todo: { title: "My Tasks", items: [] },
  inProgress: { title: "Inprogress", items: [] },
  done: { title: "Completed", items: [] },
};

const Screen = () => {
  const [columns, setColumns] = useState(initialData);
  const [newTask, setNewTask] = useState("");

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];
    const startItems = [...startColumn.items];
    const finishItems = [...finishColumn.items];

    const [moved] = startItems.splice(source.index, 1);
    finishItems.splice(destination.index, 0, moved);

    setColumns({
      ...columns,
      [source.droppableId]: { ...startColumn, items: startItems },
      [destination.droppableId]: { ...finishColumn, items: finishItems },
    });
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: uuidv4(),
      task: newTask,
      assigned_To: "Task Owner",
      assignee: "User1",
      priority: "High",
      due_Date: "01/10/2024",
    };

    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        items: [...columns.todo.items, task],
      },
    });
    setNewTask("");
  };

  return (
    <div>
      <Box sx={{ mb: 3, mt: 4, display: "flex" }}>
        <TextField
          label="Create New Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          sx={{ mr: 2, width: "500px", fontSize: "18px" }}
        />
        <Button
          sx={{ width: "160px", height: "50px", fontSize: "16px", backgroundColor: "#38ad6d", color: "#fff", "&:hover": { backgroundColor: "#2ecc71" } }}
          variant="contained"
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <BoardWrapper>
          {Object.entries(columns).map(([columnId, column]) => (
            <ColumnWrapper key={columnId}>
              <Droppable type="task" droppableId={columnId}>
                {(provided) => (
                  <TaskContainer ref={provided.innerRef} {...provided.droppableProps}>
                    <Box sx={{ width: "100%", mb: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Header>{column.title}</Header>
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {column.items.map((item, index) => (
                      <TodoCard key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskContainer>
                )}
              </Droppable>
            </ColumnWrapper>
          ))}
        </BoardWrapper>
      </DragDropContext>
    </div>
  );
};

export default Screen;

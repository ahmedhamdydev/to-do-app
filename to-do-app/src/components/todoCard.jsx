import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "@mui/system";

const Title = styled("div")(() => ({
  marginBottom: "4px",
  color: "#888888",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  fontSize: "14px",
}));

const SubTitle = styled("span")(() => ({
  color: "#111111",
  fontWeight: "700",
  fontStyle: "italic",
  fontSize: "15px",
}));

const Heading = styled("div")(() => ({
  color: "#111111",
  fontWeight: "700",
  fontSize: "20px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  borderBottom: "2px solid #111111",
  paddingBottom: "8px",
}));

const TodoCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            sx={{
              minWidth: 250,
              m: "16px 8px",
              mt: "24px",
              background: "linear-gradient(145deg, #e0e0e0, #ffffff)",
              borderRadius: "16px",
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.5)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <CardContent sx={{ p: "24px" }}>
              <Heading sx={{ mb: "16px" }}>{item.assigned_To}</Heading>
              <Typography
                sx={{ fontSize: 18, color: "#333333", fontWeight: "600", mb: "12px" }}
                gutterBottom
              >
                {item.task}
              </Typography>
              <Box sx={{ flexGrow: 1, color: "#333333", mt: "32px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Title>By</Title>
                    <SubTitle>{item.assignee}</SubTitle>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Title>Rank</Title>
                    <SubTitle>{item.priority}</SubTitle>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Title>Untill</Title>
                    <SubTitle>{item.due_Date}</SubTitle>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TodoCard;

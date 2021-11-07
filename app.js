const express = require("express");

const app = express();
const port = 5000;

app.use(express.json());

let tasks = [
  {
    id: 0,
    taskName: "weakup",
    isCompleted: true,
  },
  {
    id: 1,
    taskName: "eat",
    isCompleted: false,
  },
  {
    id: 2,
    taskName: "code",
    isCompleted: false,
  },
];

//    Create    //
app.post("/addTask/:taskName", (req, res) => {
  const { taskName } = req.params;
  tasks.push({ id: tasks.length, taskName, isCompleted: false });

  res.status(200);
  res.send(tasks);
});

//    Read    //
app.get("/", (req, res) => {
  res.status(200);
  res.send(tasks);
});

app.get("/task/:id", (req, res) => {
  const { id } = req.params;

  res.status(200);
  res.send(tasks[id]);
});

app.get("/task", (req, res) => {
  const { id } = req.query;

  res.status(200);
  res.send(tasks[id]);
});

//    Update    //
app.put("/update-by-id/:id/:taskName", (req, res) => {
  const { id, taskName } = req.params;

  tasks.splice(id, 1, { id, taskName, isCompleted: false });

  res.status(200);
  res.json(tasks);
});

app.put("/update-by-id/", (req, res) => {
  const { id, taskName } = req.query;

  tasks.splice(id, 1, { id, taskName, isCompleted: false });

  res.status(200);
  res.json(tasks);
});

app.put("/update-by-id/body", (req, res) => {
  const { id, taskName } = req.body;

  tasks.splice(id, 1, { id, taskName, isCompleted: false });

  res.status(200);
  res.json(tasks);
});

app.put("/update-by-name/:oldTaskName/:newTaskName", (req, res) => {
  const { oldTaskName, newTaskName } = req.params;

  const taskId = tasks.find((task, i) => task.taskName === oldTaskName);
  tasks.splice(taskId.id, 1, {
    id: taskId.id,
    taskName: newTaskName,
    isCompleted: false,
  });

  res.status(200);
  res.json(tasks);
});

app.put("/task-Completed/:id", (req, res) => {
  const { id } = req.params;

  tasks.splice(id, 1, { id, taskName: tasks.taskName, isCompleted: true });

  res.status(200);
  res.json(tasks);
});

app.put("/task-not-Completed/:id", (req, res) => {
  const { id } = req.params;

  tasks.splice(id, 1, { id, taskName: tasks[id].taskName, isCompleted: false });

  res.status(200);
  res.json(tasks);
});



//    Delete    //
app.delete("/deleteAll", (req, res) => {
  let newTasks = [];
  tasks = [...newTasks];

  res.status(200);
  res.json(tasks);
});

app.delete("/delete-by-id/:id", (req, res) => {
  const { id } = req.params;
  tasks.splice(id, 1);

  res.status(200);
  res.json(tasks);
});

app.delete("/delete-by-name/:taskName", (req, res) => {
  const { taskName } = req.params;
  const taskId = tasks.find((task, i) => {
    if (task.taskName === taskName) return i;
  });

  tasks.splice(taskId.id, 1);

  res.status(200);
  res.json(tasks);
});

app.delete("/remove-Completed", (req, res) => {
  const newTasks = tasks.filter((task) => task.isCompleted === false);
  tasks = [...newTasks];

  res.json(tasks);
});

//    server    //
app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});

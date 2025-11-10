
let storedTasks = [];

export const saveTask = (tasks) => {
  storedTasks = tasks;
};

export const loadTasks = () => {
  return storedTasks;
};

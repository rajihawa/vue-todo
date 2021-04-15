import moment, { Moment } from "moment";

export type TaskStatus = "pending" | "done" | "canceled";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due: Moment;
  updated: Moment;
  created: Moment;
};

export const emptyTask: Task = {
  id: "",
  title: "",
  description: "",
  status: "pending",
  due: moment(),
  updated: moment(),
  created: moment(),
};

export const intiialTasks: Task[] = [
  {
    id: "dfgdfdfgadf",
    title: "Title 3",
    description:
      "this is a slightly longer description to text the limits of the container, and this is even a alonger one to test it even further",
    status: "pending",
    due: moment(),
    created: moment(),
    updated: moment(),
  },
  {
    id: "sdfgsdfsd",
    title: "Title 1",
    description: "test task 1",
    status: "pending",
    due: moment(),
    created: moment(),
    updated: moment(),
  },
  {
    id: "dfgadf",
    title: "Title 2",
    description:
      "this is a slightly longer description to text the limits of the container",
    status: "pending",
    due: moment(),
    created: moment(),
    updated: moment(),
  },

  {
    id: "dfgdfgdf",
    title: "Title 3",
    description:
      "this is a slightly longer description to text the limits of the container",
    status: "pending",
    due: moment(),
    created: moment(),
    updated: moment(),
  },
  {
    id: "dfgddfgfdfgadf",
    title: "Title 4",
    description:
      "this is a slightly longer description to text the limits of the container, and this is even a alonger one to test it even further",
    status: "pending",
    due: moment(),
    created: moment(),
    updated: moment(),
  },
  {
    id: "sdfdfgdgsdfsd",
    title: "Title 5",
    description: "test task 1",
    status: "pending",
    due: moment(),
    created: moment(),
    updated: moment(),
  },
];

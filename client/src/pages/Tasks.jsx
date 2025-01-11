/* eslint-disable no-unused-vars */
import { useState } from "react";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";
import { MdAddTask } from "react-icons/md";
import TaskTitle from "../components/TaskTitle";
import Loading from "../components/Loader";
import Tabs from "../components/Tabs";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/Task/Table";
import AddTask from "../components/Task/AddTask";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<MdAddTask className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-lg py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle
              label='To Do'
              className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle
              label='completed'
              className={TASK_TYPE.completed} />
          </div>
        )}

        <BoardView tasks={tasks} />
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
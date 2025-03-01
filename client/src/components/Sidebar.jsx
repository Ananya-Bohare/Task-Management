/* eslint-disable react/prop-types */
import {
    MdDashboard,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
} from "react-icons/md";
import { FaTasks , FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { FcParallelTasks } from "react-icons/fc";
import { setOpenSidebar } from "../redux/slices/authSlice";

const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard />,
    },
    {
        label: "Tasks",
        link: "tasks",
        icon: <FaTasks />,
    },
    {
        label: "Completed",
        link: "completed/completed",
        icon: <MdTaskAlt />,
    },
    {
        label: "In Progress",
        link: "in-progress/in progress",
        icon: <MdOutlinePendingActions />,
    },
    {
        label: "To Do",
        link: "todo/todo",
        icon: <MdOutlinePendingActions />,
    },
    {
        label: "Team",
        link: "team",
        icon: <FaUsers />,
    }
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const location = useLocation();

    const path = location.pathname.split("/")[1];

    const sidebarLinks = user?.isAdmin
  ? linkData // Show all links if the user is an admin
  : linkData.filter((link) => !["Team", "Trash"].includes(link.label)); // Exclude "Team" and "Trash" for non-admin users


    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };

    const NavLink = ({ el }) => {
        return (
            <Link
                to={el.link}
                onClick={closeSidebar}
                className={clsx(
                    "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
                    path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
                )}
            >
                {el.icon}
                <span className='hover:text-[#2564ed]'>{el.label}</span>
            </Link>
        );
    };
    return (
        <div className='w-full  h-full flex flex-col gap-6 p-5'>
            <h1 className='flex gap-1 items-center'>
                <span className=" flex justify-center items-center gap-4 text-[27px] font-bold">
                    WorkHive
                    <span className="text-[40px]">
                        <FcParallelTasks />
                    </span>
                </span>
            </h1>

            <div className='flex-1 flex flex-col gap-y-5 py-8'>
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>

            <div className=''>
                <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
                    <MdSettings />
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
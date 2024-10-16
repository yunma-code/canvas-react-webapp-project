import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

const KanbasNavigation: React.FC = () => {
  const location = useLocation();

  // set curr link as active
  const isActive = (path: string): boolean => {
    return location.pathname.startsWith(path);
  };

  return (
    <div
      id="wd-kanbas-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
        rel="noreferrer"
      >
        <img src="/images/NEU.png" width="75px" alt="NEU Logo" />
      </a>
      <Link
        to="/Kanbas/Account"
        id="wd-account-link"
        className={`list-group-item text-center border-0 ${
          isActive('/Kanbas/Account') ? 'active' : 'bg-black text-white'
        }`}
      >
        <FaRegCircleUser className="fs-1" /><br />
        Account
      </Link>
      <Link
        to="/Kanbas/Dashboard"
        id="wd-dashboard-link"
        className={`list-group-item text-center border-0 ${
          isActive('/Kanbas/Dashboard') ? 'active' : 'bg-black text-white'
        }`}
      >
        <AiOutlineDashboard className="fs-1" /><br />
        Dashboard
      </Link>
      <Link
        to="/Kanbas/Courses"
        id="wd-course-link"
        className={`list-group-item text-center border-0 ${
          isActive('/Kanbas/Courses') ? 'active' : 'bg-black text-white'
        }`}
      >
        <LiaBookSolid className="fs-1" /><br />
        Courses
      </Link>
      <Link
        to="/Kanbas/Calendar"
        id="wd-calendar-link"
        className={`list-group-item text-center border-0 ${
          isActive('/Kanbas/Calendar') ? 'active' : 'bg-black text-white'
        }`}
      >
        <IoCalendarOutline className="fs-1" /><br />
        Calendar
      </Link>
      <Link
        to="/Kanbas/Inbox"
        id="wd-inbox-link"
        className={`list-group-item text-center border-0 ${
          isActive('/Kanbas/Inbox') ? 'active' : 'bg-black text-white'
        }`}
      >
        <FaInbox className="fs-1" /><br />
        Inbox
      </Link>
      <Link
        to="/Labs/*"
        id="wd-labs-link"
        className={`list-group-item text-center border-0 ${
          isActive('/Labs') ? 'active' : 'bg-black text-white'
        }`}
      >
        <LiaCogSolid className="fs-1" /><br />
        Labs
      </Link>
    </div>
  );
};

export default KanbasNavigation;

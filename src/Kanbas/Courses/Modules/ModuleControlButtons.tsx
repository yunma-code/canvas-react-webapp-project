import { IoEllipsisVertical } from "react-icons/io5";
<<<<<<< HEAD
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule, haveEditAccess }:
  { moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void; haveEditAccess: boolean }) {
  return (
    <div className="float-end">
      {haveEditAccess &&
        <>
          <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
          <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
        </>
      }
      <GreenCheckmark />
      <BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
=======
import { FaPlus, FaPencil } from "react-icons/fa6";
import { FaPen, FaTrash } from "react-icons/fa";

import GreenCheckmark from "./GreenCheckmark";
export default function LessonControlButtons(
  { moduleId, deleteModule, editModule }: { 
    moduleId: string; deleteModule: (moduleId: string) => void; 
    editModule: (moduleId: string) => void }) {
  return (
    <div className="float-end">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
      <GreenCheckmark /> <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6

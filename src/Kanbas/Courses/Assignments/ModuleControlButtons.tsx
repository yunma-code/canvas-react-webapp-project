import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({ haveEditAccess }: { haveEditAccess: boolean }) {
  return (
    <div className="float-end">
      {haveEditAccess &&
        <BsPlus />
      }
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

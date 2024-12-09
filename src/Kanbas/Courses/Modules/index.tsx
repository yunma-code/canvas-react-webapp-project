import ModulesControls from "./ModulesControls";
import  { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
<<<<<<< HEAD
import React, { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import LessonControlButtons from "./BsGripVertical";
=======
import React, { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6

export default function Modules() {
	const { cid } = useParams();
  // const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
<<<<<<< HEAD
  let haveEditAccess = currentUser.role === "FACULTY";
=======
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const createModuleForCourse = async () => {
    if(!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    console.log("Fetched modules: ", modules);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6

  // get user role
  const user = db.users.find((user: any) => user.username === currentUser?.username);
  const userRole = user ? user.role : null;
  
  // const addModule = () => {
  //   setModules([ ...modules, { _id: new Date().getTime().toString(),
  //     name: moduleName, course: cid, lessons: [] }]);
  //   setModuleName("");
  // };
  // const deleteModule = (moduleId: string) => {
  //   setModules(modules.filter((m) => m._id !== moduleId));
  // };
  // const editModule = (moduleId: string) => {
  //   setModules(modules.map((m) => (m._id === moduleId ? {...m, editing: true} : m)));
  // };
  // const updateModule = (module: any) => {
  //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
  // };
<<<<<<< HEAD
=======


>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
  return (
    <div className="wd-modules">
      <ModulesControls setModuleName={setModuleName} 
        moduleName={moduleName} 
<<<<<<< HEAD
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }} />
      <br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
=======
        addModule={createModuleForCourse} />
      <br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          // .filter((module: any) => module.course === cid)
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
          .map((module: any) => (
        <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            {!module.editing ? ( module.name) : (
              <input
                className="form-control w-50 d-inline-block"
                onChange={(e) => dispatch(updateModule({...module, name: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
<<<<<<< HEAD
                    dispatch(updateModule({ ...module, editing: false }));
=======
                    saveModule({ ...module, editing: false });
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
                  }
                }}
                defaultValue={module.name}
              />
            )}
            {/* only faculty can see module control buttons */}
            {userRole === "FACULTY" && (
              <ModuleControlButtons
                moduleId={module._id}
<<<<<<< HEAD
                deleteModule={(moduleId) => {
                  dispatch(deleteModule(moduleId));}}
                editModule={(moduleId) => dispatch(editModule(module._id))}
                haveEditAccess={haveEditAccess}
=======
                deleteModule={(moduleId) => removeModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(module._id))}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
             />
             )}
          </div>
          {module.lessons && (
            <ul className="wd-lessons list-group rounded-0">
              {module.lessons.map((lesson: any) => (
                <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name}
<<<<<<< HEAD
                  <LessonControlButtons />
                  {/* only faculty can see module control buttons */}
                  {/* {userRole === "FACULTY" && (
                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={(moduleId) => {
                        dispatch(deleteModule(moduleId));
                      }}
                      editModule={(moduleId) => dispatch(editModule(module._id))}
                      haveEditAccess={haveEditAccess}
                  />  )} */}
=======

                  {/* only faculty can see module control buttons */}
                  {userRole === "FACULTY" && (
                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={(moduleId) => removeModule(moduleId)}
                      editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />  )}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
                  </li>
              ))}</ul>
          )}</li>
      ))} </ul> </div>
  );}
<<<<<<< HEAD
                  
=======
                  
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6

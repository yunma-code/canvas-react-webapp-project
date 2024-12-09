import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
<<<<<<< HEAD
const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: assignment._id,
        title: assignment.title,
        course: assignment.course,
        points: assignment.points,
        type: assignment.type,
        assignTo: assignment.assignTo,
        available: assignment.available,
        due: assignment.due,
        until: assignment.until,
        description: assignment.description,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: moduleId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === moduleId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;

=======

const initialState = {
	assignments: assignments || [],
};

const assignmentsSlice = createSlice({
	name: "assignments",
	initialState,
	reducers: {
		addAssignment: (state, { payload: assignments }) => {
      // state.assignments = state.assignments.filter(
      //   (a: any) => a._id !== assignment._id
      // );
      // state.assignments.push(assignments);
      state.assignments = assignments;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (assignment: any) => assignment._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === updatedAssignment._id ? updatedAssignment : assignment
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
	assignmentsSlice.actions;
export default assignmentsSlice.reducer;
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6

import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

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

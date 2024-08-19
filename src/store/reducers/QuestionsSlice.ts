import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionsState {
  id: number;
  title: string;
}

const initialState = {
  questions: JSON.parse(
    sessionStorage.getItem("questions") || "[]"
  ) as QuestionsState[],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<QuestionsState>) => {
      state.questions.push(action.payload);
      sessionStorage.setItem("questions", JSON.stringify(state.questions));
    },

    removeQuestion: (state, action: PayloadAction<number>) => {
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      );

      sessionStorage.setItem("questions", JSON.stringify(state.questions));
    },
  },
});

export const { setQuestion, removeQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;

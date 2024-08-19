import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface QuestionsState {
    id: number
    title: string
}

const initialState = {
    questions: [] as QuestionsState[],
}

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestion: (state, action: PayloadAction<QuestionsState>) => {
            state.questions.push(action.payload)
        },

        removeQuestion: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.filter(question => question.id !== action.payload)
        },

    }
})

export const { setQuestion, removeQuestion } = questionsSlice.actions

export default questionsSlice.reducer
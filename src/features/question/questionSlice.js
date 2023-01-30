import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
    name: 'question',

    // 질문자의 아이디와 이름을 초기 상태로 설정
    initialState: {
        questionId: null,
        questionName: null,
    },

    // 액션들을 정의해준다
    reducers: {
        setQuestionInfo: (state, action) => {
            state.questionId = action.payload.questionId;
            state.questionName = action.payload.questionName;
        }
    }
});

export const { setQuestionInfo } = questionSlice.actions;
export const selectQuestionId = (state) => state.question.questionId;
export const selectQuestionName = (state) => state.question.questionName;
export default questionSlice.reducer;
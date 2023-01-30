// store란? 리덕스 기능을 api화 시킨 것, state 값들을 저장하는 장소
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import questionReducer from '../features/question/questionSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		question: questionReducer,
	},	
});
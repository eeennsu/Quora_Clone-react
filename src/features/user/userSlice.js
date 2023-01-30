// 리듀서 함수의 대상인 초기 상태와 슬라이스 이름을 받아 리듀서와 상태에 해당하는 액션 생성자와 타입을 자동으로 생성하는 함수
import { createSlice } from '@reduxjs/toolkit'; 

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,                 // 유저의 초기상태는 없는 사람이다
    },
    reducers: {                     // reducers의 객체의 키는 액션 이름이다. ex) login은 'login'이라는 이름의 액션을 받아올 때 적용한다
        login: (state, action) => {
            state.user = action.payload;                // action.payload에는 전달 받은 값이 들어있다. (app.js의 login dispatch에 있는 값)
        },
        logout: (state) => {
            state.user = null;
        },
    }
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;

/* 
    action의 type    : 액션을 상징하는 것이 들어간다. 대표적으로 문자열이 들어간다
    action의 palyload: 액션의 실행에 필요한 데이터들이 들어간다
*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { login, logout, selectUser } from './features/user/userSlice';
import Login from './views/Components/Login/Login';
import Quora from './views/Components/Quora/Quora';
import { auth } from'./backend/database/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from './views/Components/Loading/Loading';

function App() {

	// useSelector란 리덕스의 상태값을 조회하기위한 훅 함수이다
	// 여기서는 userSlice.js에서 state => state.user.user를 가져오므로 현재 state에 createSlice에 따른 user의 상태값을 넣어주는 것이다
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// 현재 로그인 상태의 변화를 체크한다
		onAuthStateChanged(auth, (authUser) => {

			// 로그인 시도에 성공한 상태이면?
			if(authUser){
				// 서버에서 받아온 로그인한 유저의 상태값을 적용한 후 전송한다.
				dispatch(login({
					uid: authUser.uid,
					photo: authUser.photoURL,
					displayName: authUser.displayName,
					email: authUser.email,
				}));	
				console.log(authUser);
			} else {
				dispatch(logout());
			}

			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<div className="App">
			{			
				isLoaded ? (user ? (<Quora />) : (<Login />)) : <Loading />
			}
		</div>
	);
}

export default App;
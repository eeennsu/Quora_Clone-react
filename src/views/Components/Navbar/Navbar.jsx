import React, { useCallback, useState } from 'react';
import {
    AssignmentIndOutlined,
    BorderAllRounded, ExpandMore,
    Home, Language, Link,
    NotificationsOutlined,
    PeopleAltOutlined, Search   
} from '@mui/icons-material';
import { Avatar, Button, Input } from '@mui/material';
import logo_Quora from '../../Styled/images/Quora.png'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/user/userSlice';
import { auth, database, signOut, serverTimestamp, collection, addDoc } from '../../../backend/database/firebase';
import { QUESTIONS } from '../../../backend/database/dbNames';
import Modal from 'react-modal';

const Navbar = () => {

    const user = useSelector(selectUser);
    const [isOpend, setIsOpend] = useState(false);
    const [inputTitle, setInputTitle] = useState('');
    const [inputUrl, setInputUrl] = useState('');

    const logoutHandler = useCallback(() => {
        signOut(auth);
    }, [auth]); 
    
    const closeModal = useCallback(() => {
        setIsOpend(false);
    }, []);    

    const registerQuestion = useCallback((e) => {
        e.preventDefault();

        if(inputTitle.length === 0 || inputUrl.length === 0){
            alert('제목과 이미지 링크를 작성해주세요!');
            return;
        }
        // 먼저 창이 닫혀야 한다
        closeModal();           
                              
        // db에 등록한다
        // questions는 db의 경로 즉 테이블 이름이라고 생각하면 된다. add는 데아터 삽입이다
        addDoc(collection(database, QUESTIONS), {
            user: user,
            question: inputTitle,
            imageUrl: inputUrl,
            questiontimestamp: serverTimestamp()
        }).then(() => {
            setInputTitle('');
            setInputUrl('');
        }).catch((e) => console.error(e));    
    }, [user, inputTitle, inputUrl]);

    return(
        <nav className="navbar">
            <div className="qHeader_logo">
                <img src={logo_Quora} alt=""/>                   
            </div>
            <div className="qHeader_icons">
                <div className="qHeader_icon">
                    <Home />
                </div>
                <div className="qHeader_icon">
                    <BorderAllRounded />
                </div>
                <div className="qHeader_icon">
                    <AssignmentIndOutlined />
                </div>
                <div className="qHeader_icon">
                    <PeopleAltOutlined />
                </div>
                <div className="qHeader_icon">
                    <NotificationsOutlined />
                </div>
            </div>            
            <div className="qHeader_input">
                <form>
                    <input type="text" placeholder="Search..."/>
                    <Search />
                </form>               
            </div>
            <div className="qHeader_Rem">
                <div className="qHeader_avatar">
                    <Avatar src={user.photo} onClick={logoutHandler}/>
                </div>
                <Language />
                <Button onClick={() => setIsOpend(state => !state)}> Add to Question </Button>  
                <Modal
                    style={{ overlay: { 
                                position: 'absolute',
                                width: 900, 
                                height: 800, 
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                zIndex: 1000,
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '15px',

                        }}} 
                    isOpen={isOpend} onRequestClose={closeModal} 
                    shouldCloseOnOverlayClick
                    shouldCloseOnEsc
                    ariaHideApp={false}>
                    <div className="modal_header">
                        <h5>Question</h5>
                        <h5>Share</h5>
                    </div>
                    <div className="modal_body">
                        <Avatar src={user.photo}/>
                        <p>Writer : {user.displayName || user.email}</p>
                        <div className='modal_scope'>
                            <PeopleAltOutlined />
                            <p>전체 공개</p>
                            <ExpandMore />                            
                        </div>                     
                    </div>
                    <div className='modal_field'>
                        <Input className='filed' type='text' placeholder='Please write your question in question 6' 
                            value={inputTitle} required onChange={(e) => setInputTitle(e.target.value)}/>                      
                        <div className='modal_fieldLink'>
                            <Link />                                
                            <Input className='filed' type='text' placeholder='Please write only the url link' 
                                value={inputUrl} required onChange={(e) => setInputUrl(e.target.value)}/>
                        </div>                        
                        <div className='modal_button'>
                            <button className='btn_question' onClick={registerQuestion}>Register</button>
                            <button className='btn_close' onClick={closeModal}>Close</button>
                        </div>
                    </div>                    
                </Modal>                                                    
            </div>
        </nav>
    );
}

export default Navbar;
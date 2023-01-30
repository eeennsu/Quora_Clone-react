import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestionName, selectQuestionId, setQuestionInfo } from '../../../../features/question/questionSlice';
import { selectUser } from '../../../../features/user/userSlice';
import { database, doc, updateDoc, serverTimestamp, query, onSnapshot, orderBy, deleteDoc } from '../../../../backend/database/firebase';
import { QUESTIONS } from '../../../../backend/database/dbNames';

const Post = memo(({ Id, questiontimestamp, question, image, quoraUser, dbQuestionsRef }) => {
    
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const questionId = useSelector(selectQuestionId);
    const questionName = useSelector(selectQuestionName);
    const [isOpend, setIsOpend] = useState(false);
    const [inputAnswer, setInputAnswer] = useState('');
    const [writtenAnswer, setWrittenAnswer] = useState([]);
    const { photo, displayName, email, uid } = useMemo(() => quoraUser);
    const timestampFormat = useCallback((time) => new Date(time?.toDate()).toLocaleString(), [questiontimestamp]);

    const closeModal = useCallback(() => {
        setIsOpend(false);
    }, []);

    const dispatchQuestion = useCallback(() => {
        dispatch(setQuestionInfo({
            questionId: Id,                     // 질문의 아이디와
            questionName: question,             // 질문의 이름을 넣어준다
        }));
    }, [dispatch]);

    const handleAnswer = useCallback((e) => {
        e.preventDefault();

        if(inputAnswer.length === 0){
            alert('please input answer...');
            return;
        }

        // 해당 클릭한 질문의 id가 존재한다면 doc add를 진행한다
        if(questionId){
            (async () => {
                const docRef = doc(database, QUESTIONS, questionId);

                await updateDoc(docRef, {
                    questionId: questionId,
                    answertiemstamp: serverTimestamp(),
                    answer: inputAnswer,
                    user: user,
                });

                setInputAnswer('');
                closeModal();
            })();         
        }
    }, [inputAnswer]);

    const deletePost = useCallback((e) => {
        e.preventDefault();
        (async () => {
            try{
                const docRef = doc(database, QUESTIONS, Id);

                await deleteDoc(docRef);
            } catch (e) {
                console.error(e);
            }  
        })();
    }, []);

    useEffect(() => {      
        (async () => {
            try{
                const q = await query(dbQuestionsRef, orderBy('answertiemstamp', 'desc'));         // 작성 시간 순서대로 오름차순
                onSnapshot(q, (snapshot) => {
                    setWrittenAnswer(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        answers: doc.data()                        // 답변은 하나의 글에 여러개 존재가 가능하기 때문에 answers이다
                    })));
                });    
                
            } catch (e){
                console.error(e);
            }           
        })();
    }, [questionId]);       // 질문이 바뀔 때마다 변경

    return (
        <div className='post'>
            <div className="post_header">
                <Avatar src={photo}/>
                <h5>{displayName || email}</h5>
                <small>{timestampFormat(questiontimestamp)}</small>
                { (user.uid === uid) && <button className='btn_delete' onClick={deletePost}>Delete</button>}
            </div>
            <div className="post_body">
                <div className="post_question">
                    <p>{question}</p>             
                    <button className='post_btnAnwser' onClick={() => {
                            dispatchQuestion();
                            setIsOpend(state => !state);
                        }}>                        
                        답변하기
                    </button>
                    <Modal
                        style={{ overlay: { 
                                    position: 'absolute',
                                    width: 800, 
                                    height: 600, 
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
                        <div className="modal_question">
                            <h1>{question}</h1>
                            <p>
                                from - <span className='name'>{displayName || email}</span> // writed - 
                                <span className='time'>{timestampFormat(questiontimestamp)}</span>
                            </p>
                        </div>
                        <div className="modal_answer">
                            <textarea placeholder='please write your think!' required value={inputAnswer} onChange={(e) => setInputAnswer(e.target.value)}/>                    
                        </div>   
                        <div className='modal_buttons'>
                            <button type='submit' className='add' onClick={handleAnswer}>Answer</button>
                            <button type='button' className='close' onClick={closeModal}>Close</button>
                        </div>            
                    </Modal> 
                </div>
                <img src={image} />
                <div className='post_answer'>
                    { writtenAnswer && writtenAnswer.map(({ id, answers }) => (<p key={id} style={{ position: 'relative', marginBottom: '5px' }}>
                        {
                            Id === answers.questionId && (
                                <React.Fragment>
                                    <span style={{ padding: '6px' }}>{answers.answer}</span>
                                    <br />
                                    <span style={{ position: 'absolute', color: 'yellowgreen', display: 'flex', right: '0px' }}>
                                        <span style={{ color: 'black', marginRight: '15px' }}>
                                            답변 등록 : {answers.user.displayName || answers.user.email}
                                        </span>
                                        {timestampFormat(answers.answertiemstamp)}
                                    </span>
                                </React.Fragment>                                
                            )
                        }
                    </p>))}
                </div>              
            </div>
            <div className="post_footer">
                <div className="post_footer_leftAction">
                    <ArrowUpwardOutlined />
                    <ArrowDownwardOutlined />
                    <RepeatOneOutlined />
                    <ChatBubbleOutlineOutlined />
                </div>         
                <div className='post_footer_rightAction'>
                     <ShareOutlined />
                     <MoreHorizOutlined />
                </div>
            </div>
        </div>
    );
});

export default Post;
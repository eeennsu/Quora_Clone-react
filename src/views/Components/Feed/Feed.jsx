import { Button } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import QuoraBox from './sections/QuoraBox';
import Post from './sections/Post';
import { getDoc, getDocs, collection, database, doc, query, orderBy, onSnapshot } from '../../../backend/database/firebase';
import { QUESTIONS } from '../../../backend/database/dbNames';

const Feed = () => {
    
    const [posts, setPosts] = useState([]);
    const dbQuestionsRef = useMemo(() => collection(database, QUESTIONS));

    useEffect(() => {
        (async () => {
            try{
                const q = await query(dbQuestionsRef, orderBy('questiontimestamp', 'desc'));         // 작성 시간 순서대로 오름차순
                onSnapshot(q, (snapshot) => {
                    setPosts(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        question: doc.data()
                    })));
                });    
                       
            } catch (e){
                console.error(e);
            }           
        })();
    }, []);   

    return (
        <div className='feed'>
            <QuoraBox />  
            <hr />   
            {
                posts && posts.map(({ id, question }) => (
                    <Post 
                        key={id} 
                        Id={id} 
                        image={question.imageUrl} 
                        questiontimestamp={question.questiontimestamp} 
                        quoraUser={question.user}
                        question={question.question}
                        dbQuestionsRef={dbQuestionsRef} />                      
                ))
            }
        </div>
    );
};

export default Feed;
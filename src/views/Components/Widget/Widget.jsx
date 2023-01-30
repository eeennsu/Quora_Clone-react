import { Avatar } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ADVERTISEMENTS } from '../../../backend/database/dbNames';
import { database, collection, onSnapshot } from '../../../backend/database/firebase';
import img_avatar from '../../Styled/images/avatar.png';
import WidgetOption from './sections/WidgetOption';

const Widget = () => {

    const [advertisment, setAdvertisement] = useState([]);
    // const dbAdvertisementRef = useMemo(() => collection(database, ADVERTISEMENTS));
    // 서버에서 받아온 데이터값 정의
    useEffect(() => {
        (async () => {
            try{
                const dbAdvertisementRef = await collection(database, ADVERTISEMENTS);

                onSnapshot(dbAdvertisementRef, (snapshot) => {
                    setAdvertisement(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        advertisement: doc.data()
                    })));
                });
            } catch (e) {
                console.error(e);
            }            
        })();
    }, []);

    return (
        <div className='widget'>
            <div className='widget_header'>
                <h5>광고입니다.</h5>
                <hr />              
            </div>
            <div className="widget_contents">
            <div className='widgetOptions'>  
                {advertisment && advertisment.map(({ id, advertisement }) => 
                    (<WidgetOption key={id} author={advertisement.author}
                        title={advertisement.title} content={advertisement.content}/>)
                )}
            </div>                
            </div> 
        </div>
    );
};

export default Widget;
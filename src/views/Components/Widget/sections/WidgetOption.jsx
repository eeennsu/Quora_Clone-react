import { Avatar } from '@mui/material';
import React, { memo, useCallback, useMemo } from 'react';

const WidgetOption = memo(({ title, content, author }) => {

    const stringToColor = useCallback((string) => {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
      
        return color;
    }, []);

    const stringAvatar = useCallback((name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        }
    }, []);
    
    return (                
        <div className='widget_content'>         
            <Avatar {...stringAvatar(author)} />
            <div className='widget_contentTitle'>
                <h5>{title}</h5>   
                <p>{content}</p>      
            </div>                                  
        </div>
    );
});

export default WidgetOption;
import React, { useState, useEffect } from 'react';
import Clock from 'react-live-clock';

const HeaderTimes = () => {
    let [time, setTime] = useState(new Date())
    return (
        <div className="header__right-realtime">
            <strong className="header__right-realtime-label" style={{ color: '#333' }}><Clock format={'DD/MM/yyyy - HH:mm:ss'} ticking={true} timezone={'Asia/Ho_Chi_Minh'} /></strong>
        </div>
    );
}
export default HeaderTimes;
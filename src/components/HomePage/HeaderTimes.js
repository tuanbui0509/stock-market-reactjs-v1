import React, { useState, useEffect } from 'react';
import Clock from 'react-live-clock';

const HeaderTimes = () => {
  let [time, setTime] = useState(new Date())
  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         setTime(new Date())
  //         console.log(time);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }, []);
  return (
    <div className="header__right-realtime">
      <strong className="header__right-realtime-label" style={{color: '#333'}}><Clock format={'dddd, MMMM Mo, YYYY, h:mm:ss A'} ticking={true} timezone={'Asia/Ho_Chi_Minh'} /></strong>
    </div>
  );
}
export default HeaderTimes;

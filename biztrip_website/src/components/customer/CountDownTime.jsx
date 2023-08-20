import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/dist/locale/vi.js';

moment.locale('vi');

const CountDownTime = ({timeToAdd, timeToExpire, setOpenModalNotification, setIsTimeExpire}) => {
    const [timeRemaining, setTimeRemaining] = useState('00:00')

    useEffect(() => {
        const currentTime = moment(new Date)
        if (timeToAdd && timeToExpire) {
            if (currentTime.isBefore(moment(timeToExpire))) {
                const duration = moment.duration(moment(timeToExpire).diff(currentTime))
                const countdownInterval = setInterval(() => {
                    duration.subtract(1, 'second');
                    const minutes = duration.minutes();
                    const seconds = duration.seconds();
                    const countdownText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    setTimeRemaining(countdownText)
                    if (duration.asSeconds() <= 0) {
                        clearInterval(countdownInterval)
                        setTimeRemaining("00:00")
                        setIsTimeExpire(true)
                        setOpenModalNotification(true)
                    }
                }, 1000);
                return () => clearTimeout(countdownInterval)
            }
        }
    }, [timeRemaining, timeToAdd, timeToExpire])
    return (
        <div className={`inline-block p-2 rounded bg-dangerColor-default_2`}>
            <h3 className={`text-[14px] inline text-white font-normal leading-[20px]`}>
                Thời gian thanh toán còn lại: {timeRemaining}
            </h3>
        </div>
    );
};

export default CountDownTime;
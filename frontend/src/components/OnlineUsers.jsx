import React, { useEffect, useState } from 'react'

const OnlineUsers = () => {
    const [onlineCount, setOnlineCount] = useState(5000);

    useEffect(() => {
        const random = Math.floor(Math.random() * (22000 - 18000 + 1)) + 15000;
        setOnlineCount(random);

        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);

            if (randomNumber < 70) {
                setOnlineCount(prevCount => prevCount + 1);
            } else {
                setOnlineCount(prevCount => Math.max(prevCount - 1, 0));
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            id="wins"
            style={{
                display: "block",
                width: 240,
                fontSize: 12,
                padding: "5px 0",
                textAlign: "center",
                lineHeight: 1,
                backgroundColor: "#FFC107",
                borderRadius: 10,
                border: "3px solid #1f2024",
                boxShadow: "-3px 3px 0 0px #1f2024",
                margin: "-24px auto 0 auto",
                zIndex: 1000
            }}
        >
            Usuários Online
            <br />
            {onlineCount}
        </div>
    )
}

export default OnlineUsers
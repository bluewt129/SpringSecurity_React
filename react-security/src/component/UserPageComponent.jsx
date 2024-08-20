import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import securityImage from '../images/security.png'; // 이미지 경로 임포트
import axios from 'axios';

const UserPageComponent = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log("1111");
        const storedUserData = window.sessionStorage.getItem("user");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            console.log("파싱된 데이터:", parsedData);
            setUserData(parsedData);
            console.log("2222");
        } else {
            console.log("저장된 사용자 데이터가 없습니다.");
        }
    }, []);
    
    useEffect(() => {
        if (userData) {
            console.log("userData.role:", userData.role);
        } else {
            console.log("userData가 설정되지 않았습니다.");
        }
    }, [userData]);
    
    

    useEffect(() => {
        if (userData) {
            console.log(userData.role);
        }
    }, [userData]);


    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8383/logout', {}, { withCredentials: true });
            if (response.status === 200) {
                alert('로그아웃 되었습니다');
                navigate('/');
            }
        } catch (error) {
            console.error('로그아웃 실패', error);
        }
    };

    const goToMainPage = () => {
        navigate('/mainhome');
    };

    if (!userData || !userData.role) {
        return <div>Loading...</div>;
    }

    const handleUserRequest = async () => {
        const token = userData.token;  // parsedData 대신 userData를 사용합니다.
        try {
            const response = await axios.get('http://localhost:8383/user/request', {
                headers: {
                    Authorization: `Bearer ${token}` // 헤더에 토큰을 추가
                },
                withCredentials: true, // 이 줄이 필요하다면 추가
            });
            if (response.status === 200) {
                alert('사용자 요청 성공');
            }
        } catch (error) {
            console.error('사용자 요청 실패', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
             <div><span style={{fontSize:20, marginBottom:100}}><b>User Page</b></span></div>
            <img src={securityImage} alt="Security" style={{ maxWidth: '50%', height: 'auto' }} />
            <p>Role: {userData.role}</p>
            <p>NickName: {userData.nickname}</p>
            <button onClick={handleUserRequest} style={{ marginTop: '15px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                사용자 요청 보내기
            </button>
            <button onClick={goToMainPage} style={{ marginTop: '15px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                목록
            </button>
            <button onClick={handleLogout} style={{ marginTop: '15px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                로그아웃
            </button>
        </div>
    );
};

export default UserPageComponent;
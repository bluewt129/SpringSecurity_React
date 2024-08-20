import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import securityImage from '../images/security.png'; // 이미지 경로 임포트
import axios from 'axios';

const MainHomeComponent = () => {
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

    const goToAdminPage = () => {
        navigate('/admin');
    };

    if (!userData || !userData.role) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div><span style={{ fontSize: 20, marginBottom: 100 }}><b>Login Success</b></span></div>
            <img src={securityImage} alt="Security" style={{ maxWidth: '50%', height: 'auto' }} />
            <p>Role: {userData.role}</p>
            {userData.role === '[ROLE_ADMIN]' && (
                <button onClick={goToAdminPage} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                    관리자 페이지
                </button>
            )}
            <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                로그아웃
            </button>

        </div>
    );
};

export default MainHomeComponent;

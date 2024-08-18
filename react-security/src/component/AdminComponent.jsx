import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import securityImage from '../images/security.png'; // 이미지 경로 임포트
import axios from 'axios';

const AdminComponent = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = window.sessionStorage.getItem("user");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData(parsedData);

            if (parsedData.role !== '[ROLE_ADMIN]') {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/mainhome');
                }, 1700); 
            } else {
                setLoading(false); 
            }
        } else {
            setTimeout(() => {
                navigate('/');
            }, 1700);
        }
    }, [navigate]);

    if (!userData || userData.role !== '[ROLE_ADMIN]') {
        return <div style={{fontSize:30, marginTop:300}}>관리자 권한이 필요합니다</div>;
    }

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
             <div><span style={{fontSize:20, marginBottom:100}}><b>Admin Page</b></span></div>
            <img src={securityImage} alt="Security" style={{ maxWidth: '50%', height: 'auto' }} />
            <p>Role: {userData.role}</p>
            <button onClick={goToMainPage} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                목록
            </button>
            <button onClick={handleLogout} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                로그아웃
            </button>
        </div>
    );
};

export default AdminComponent;

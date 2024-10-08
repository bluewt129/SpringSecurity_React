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

            if (!parsedData.role.includes('ROLE_ADMIN')) {
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

    if (!userData || !userData.role.includes('ROLE_ADMIN')) {
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

    const handleAdminRequest = async () => {
        const token = userData.token;  // parsedData 대신 userData를 사용합니다.
        try {
            const response = await axios.get('http://localhost:8383/admin/request', {
                headers: {
                    Authorization: `Bearer ${token}` // 헤더에 토큰을 추가
                },
                withCredentials: true, // 이 줄이 필요하다면 추가
            });
            if (response.status === 200) {
                alert('관리자 요청 성공');
            }
        } catch (error) {
            console.error('관리자 요청 실패', error);
        }
    };
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
             <div><span style={{fontSize:20, marginBottom:100}}><b>Admin Page</b></span></div>
            <img src={securityImage} alt="Security" style={{ maxWidth: '50%', height: 'auto' }} />
            <p>Role: {userData.role}</p>
            <p>NickName: {userData.nickname}</p>
            <button onClick={handleAdminRequest} style={{ marginTop: '15px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                관리자 요청 보내기
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

export default AdminComponent;

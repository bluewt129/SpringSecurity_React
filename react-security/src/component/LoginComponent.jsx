import React, { useEffect, useState } from 'react';
import securityImage from '../images/security.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRememberMe = async () => {
        try {
            const response = await axios.get('http://localhost:8383/checkRememberMe', { withCredentials: true });
            console.log('응답 전체:', response.data);
            if (response.status === 200 && response.data && response.data.id) {
                console.log('자동 로그인 사용자 ID:', response.data.id);
                window.sessionStorage.setItem("user", JSON.stringify(response.data));
                navigate('/mainhome', { state: { userData: response.data } });
            } else {
                console.log('자동 로그인 정보가 없습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('사용자가 인증되지 않았습니다. 로그인 페이지로 이동합니다.');
                navigate('/');
            } else {
                console.error('자동 로그인 체크 실패:', error);
            }
        } finally {
            setLoading(false);  // 로딩 상태 종료
        }
    };

    checkRememberMe();
}, [navigate]);


if (loading) {
    return <div>Loading...</div>;
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('id:', userId);
    console.log('password:', userPw);
    console.log('Remember me:', rememberMe);

    try {
      const formData = new FormData();
      formData.append('id', userId);
      formData.append('password', userPw);
      formData.append('rememberMe', rememberMe ? 'true' : 'false');

      console.log('전송된 id:', userId);
      console.log('전송된 password:', userPw);
      console.log('전송된 rememberMe:', rememberMe);

      const response = await axios.post('http://localhost:8383/loginProcess', formData, {
        withCredentials: true,
      });

      console.log('로그인 성공:', response.data);

      if (response.status === 200) {
        alert(`${response.data.nickname} 님, 환영합니다`);
        console.log('id : ' + response.data.id);
        console.log('role:', response.data.role);
        console.log('nickname:', response.data.nickname);

        const userData = {
          id: response.data.id,
          role: response.data.role,
          nickname: response.data.nickname,
        };

        console.log("userData", userData);

        window.sessionStorage.setItem("user", JSON.stringify(userData));

        navigate('/mainhome', { state: { userData: response.data } });
      }

    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={securityImage} alt="Security" className="login-image" />
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
            required
            className="login-input"
          />
          <div className="checkbox" style={{ marginRight: 280, marginBottom: 10, marginTop: -10 }}>
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              자동 로그인
            </label>
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>
        <Link to={'/register'}><button className="signup-button">회원가입</button></Link>
      </div>
    </div>
  );
};

export default LoginComponent;
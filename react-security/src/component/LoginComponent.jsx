import React, { useState } from 'react';
import securityImage from '../images/security.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

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
        alert(`${response.data.id} 님, 환영합니다`);
        console.log('id : ' + response.data.id);
        console.log('role:', response.data.role);

        const userData = {
          id: response.data.id,
          role: response.data.role,
          
        };

        window.sessionStorage.setItem("user", JSON.stringify(userData));

        navigate('/mainhome');
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

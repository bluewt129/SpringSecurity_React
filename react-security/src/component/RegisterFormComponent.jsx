import React, { useState } from 'react';
import securityImage from '../images/security.png';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterFormComponent = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userPw !== confirmPw) {
      setPasswordError(true);
      return;
    }

    try {
      const formData = {
        id: userId,
        password: userPw,
      };

      const response = await axios.post('http://localhost:8383/register', formData);
      console.log('회원가입 성공:', response.data);

      if (response.status === 200) {
        alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
        navigate('/');
      }

    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleConfirmPwChange = (e) => {
    setConfirmPw(e.target.value);
    setPasswordError(userPw !== e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={securityImage} alt="Security" className="login-image" />
        <h2 className="login-title">Register</h2>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPw}
            onChange={handleConfirmPwChange}
            required
            className="login-input"
          />
          {passwordError && (
            <p style={{ color: 'red', marginTop: '10px' }}>비밀번호가 일치하지 않습니다.</p>
          )}
          <button type="submit" className="login-button">회원가입</button>
        </form>
        <Link to={'/'}><button type="submit" className="signup-button">로그인화면</button></Link>
      </div>
    </div>
  );
};

export default RegisterFormComponent;

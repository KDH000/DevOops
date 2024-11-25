import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/Header.css";

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Redux에서 로그인된 사용자 가져오기
  const loggedInUser = useSelector((state) =>
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // 로컬스토리지에서 삭제
    navigate("/login");
  };

  // 마우스가 드롭다운 영역에 들어가고 나갈 때
  const handleMouseEnter = () => setIsDropdownVisible(true);
  const handleMouseLeave = () => setIsDropdownVisible(false);

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">DevOops!</Link>
      </div>
      <nav className="header-nav">
        <Link to="/ranking">랭킹</Link>
        <Link to="/challenge">일일챌린지</Link>

        {/* 드롭다운 메뉴 전체를 감싸는 div에 이벤트 추가 */}
        <div
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="dropdown-link">게시판</span>
          {isDropdownVisible && (
            <div className="dropdown-content">
              <Link to="/board/free" onClick={() => setIsDropdownVisible(false)}>
                자유 게시판
              </Link>
              <Link to="/board/team" onClick={() => setIsDropdownVisible(false)}>
                팀원 모집 게시판
              </Link>
            </div>
          )}
        </div>

        <Link to="/promotion">홍보</Link>
      </nav>
      <div className="header-user">
        {loggedInUser ? (
          <div className="header-profile">
            <img
              src={loggedInUser.profileImage}
              alt="Profile"
              className="header-profile-image"
            />
            <span>{loggedInUser.name}님</span>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import "./css/Topic.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecommandedTopic({ topic, emoticon, onClick }) {
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);

  const handleMouseEnter = () => {
    setShowComponent(true);
  };

  const handleMouseLeave = () => {
    setShowComponent(false);
  };

  const handleChatClick = () => {
    axios
      .post("http://localhost:5000/set_topic", { topic })
      .then(() => {
        navigate("/Chat", { state: { topic, emoticon } });
        onClick(); // 부모 컴포넌트로부터 전달받은 onClick 핸들러 실행

        window.location.reload(); // 새로고침
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSpeakClick = () => {
    axios
      .post("http://localhost:5000/set_topic", { topic })
      .then(() => {
        navigate("/Speak", { state: { topic, emoticon } });
        onClick(); // 부모 컴포넌트로부터 전달받은 onClick 핸들러 실행
        window.location.reload(); // 새로고침
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="parentContainer">
      <div
        className="TopicContainer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showComponent ? (
          <>
            <div>
              <div onClick={handleSpeakClick}>Speak Go👄</div>
              <br></br>
              <div onClick={handleChatClick}>Chat Go💬</div>
            </div>
          </>
        ) : (
          <>
            <p>{topic}</p>
            <div className="emoticon">{emoticon}</div>
          </>
        )}
      </div>
    </div>
  );
}

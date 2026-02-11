import { useEffect, useState, useRef } from "react";
import confetti from 'canvas-confetti'
import videoFile from './assets/v1.mp4'
import './App.css'

function App() {
  const [noPressed, setNoPressed] = useState(false);
  const [yesBtnPosition, setYesBtnPosition] = useState({});

  // Floating hearts generation
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate initial hearts
    const newHearts = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 10 + 10 + 's',
      delay: Math.random() * 10 + 's',
      size: Math.random() * 20 + 10 + 'px'
    }));
    setHearts(newHearts);
  }, []);

  const moveYesButton = () => {
    const x = Math.random() * 200 - 100; // Increased range: -100 to 100
    const y = Math.random() * 200 - 100; // Increased range: -100 to 100

    setYesBtnPosition({
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 0.2s ease'
    });
  };



  const [yesHoverCount, setYesHoverCount] = useState(0);
  
   const [yeserror, setyeserror] = useState(0);
  const getYesButtonText = () => {
    if (yesHoverCount === 0) return "YES";
    if (yesHoverCount === 1) return "Please No 🥰";
    return "think again 😃";
  };

  // 1. Define the state (usually at the top of your component)
const [showError, setShowError] = useState(false); 

const [videomain, setvideomain ]= useState(false); 
const [final, setfinal ]= useState(false); 
const [searchmain, setsearchmain ]= useState(false); 
const [pressed, setPressed ]= useState(false); 


const handleYesHover = () => {
  moveYesButton();
  setYesHoverCount(prev => prev + 1);
  
  // Wait 2 seconds, THEN show the error
  setTimeout(() => {
    setShowError(true);
  }, 2000); 
};

  const handleNoClick = () => {
    setNoPressed(true);
  };

    const [date, setDate] = useState("");
    const [errorx, setErrorx] = useState("");
    const handleSubmit = () => {
    if (date === "31-08-2019") {
      setErrorx("");
       setfinal(true);// next page route
    } else {
      setErrorx("Nope! Type it correctly Baby 😅");
    }
  };

 const text = `Happy Valentine’s Day, baby.
First of all, I’m sorry for everything. I know that I’m the reason you went through so much pain. But today, I just want you to be happy, bby.
I love you so much, chellam. You mean everything to me — you are my life. I don’t even know the reason why I love you this much… I just do. You are that special to me.
When you were with me, I was truly happy. All I wish is for you to be happy for the rest of your life.
Once again, Happy Valentine’s Day, chellam.
I miss you, kuttachi 🖤`;

const words = text.split(" ");
const [count, setCount] = useState(0);
const intervalRef = useRef(null);

useEffect(() => {
  if (!final) return; // ❌ animation only when final = true

  setCount(0); // 🔥 RESET animation

  intervalRef.current = setInterval(() => {
    setCount(prev => {
      if (prev >= words.length) {
        clearInterval(intervalRef.current);
        return prev;
      }
      return prev + 1;
    });
  }, 180);

  return () => clearInterval(intervalRef.current);
}, [final]); // ✅ DEPENDS ON final




  useEffect(() => {
    if (noPressed) {
      const colors = ['#ff69b4', '#ffd700', '#00bfff', '#32cd32']; // Vibrant paper colors

      const interval = setInterval(function () {
        // Continuous Poppers/Paper effect
        const particleCount = 2; // Low density for constant background

        confetti({
          particleCount: 5, // Spawn a few at a time
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: colors,
          shapes: ['square'], // Paper look
          scalar: 1.2,
          gravity: 0.6,
          ticks: 600, // Stay on screen longer
          zIndex: 0,
          disableForReducedMotion: true
        });
      }, 200);

      // We still need to clear interval on unmount to avoid leaks if component unmounts
      return () => clearInterval(interval);
    }
  }, [noPressed]);

  return (
    <div className="container">
  {/* Background Hearts */}
  <div className="hearts-container">
    {hearts.map((heart) => (
      <div
        key={heart.id}
        className="heart"
        style={{
          left: heart.left,
          animationDuration: heart.animationDuration,
          animationDelay: heart.delay,
          fontSize: heart.size
        }}
      >
        ❤️
      </div>
    ))}
  </div>
  { final ? (
    /* --- STATE 1: THE APRIL FOOL PRANK --- */
    <div className="card success-container">
       <img style={{ width: "156px" }} src="src/assets/end.png" alt="Cute" />
      <h1 className="success-title">Hey Kuttachi 🖤</h1>
      <h3 className="success-tittle animate-title">
        {words.slice(0, count).join(" ")}
      </h3>
    </div>
  ) : 
   searchmain ? (
    /* --- STATE 1: THE APRIL FOOL PRANK --- */
    <div className="card success-container">
      <h1 className="success-title">Hey Kuttachi 🖤</h1>
      <h3 className="success-tittle"> Type our first outting Date to unlock my surprise love letter</h3>
      
      <div className="btn-group grupmani">
      <input
        className="inputmain"
        type="text"
        placeholder="DD-MM-YYYY"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{maxWidth:"200px"}}
      />

      <button className="btn main-sub" onClick={handleSubmit}>
        submit 🤍
      </button>

     
    </div>
     {errorx && <p style={{ color: "red" }}>{errorx}</p>}
    </div>
  ) : 

  videomain ? (
    /* --- STATE 1: THE APRIL FOOL PRANK --- */
    <div className="card success-container">
      <h1 className="success-title"></h1>
      <h3 className="success-tittle">A Happy, Memorable Day ❤️ </h3>
      <video
        className="success-video"
        
        autoPlay
        playsInline
        src={videoFile}
        style={{ width: '29%', height: '90%', borderRadius: '16px', marginTop: '20px' }}
      >
        Your browser does not support the video tag.
      </video>
      <div className="btn-group next-btn">
        <button className="btn no-btn" onClick={() => setsearchmain(true)}>
          next 🤍
        </button>
      </div>
    </div>
  ) : pressed ? (
    /* --- STATE 2: THE SUCCESS MESSAGE --- */
    <div className="card success-container">
      {/* MAC FIX: Use public/cute.png if src/assets fails */}
      <img style={{ width: "156px" }} src="src/assets/cute.png" alt="Cute" />
      <h1 className="success-title">Yaaahhh! Be my forever</h1>
      <h1 className="success-title">valentine!</h1>
      <h3 className="subtext">I want to show you some special moments of us ❤️</h3>
      <div className="btn-group">
        <button className="btn no-btn" onClick={() => setvideomain(true)}>
          See the moments
        </button>
      </div>
    </div>
  ) : (
    /* --- STATE 3: THE ORIGINAL QUESTION --- */
    <div className="card">
      <h1 className="title">
        <span className="highlight">Aarthi,</span>
        Will you be my Valentine? 💖💞
      </h1>
      <p className="subtext">Choose wisely. (The "No" button is... playing hard to get.)</p>

      <div className="btn-group">
        <button className="btn no-btn" onClick={() => setPressed(true)}>
          Yes
        </button>
        <button
          className="btn yes-btn"
          style={yesBtnPosition}
          onMouseEnter={handleYesHover}
          onClick={handleYesHover}
        >
          No
        </button>
      </div>

      {showError && (
        <p className="error">Don't waste your time to follow the no😅</p>
      )}
    </div>
  )}
</div>
  )
}

export default App

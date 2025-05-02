import { useState, useEffect, useRef } from 'react';
import './LetterPage.css';

const FloatingEmoji = ({ emoji }) => {
  const emojiRef = useRef(null);
  const [style, setStyle] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 15 + Math.random() * 25,
    rotation: Math.random() * 360,
    opacity: 0,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5
  });

  useEffect(() => {
    // Fade in animation
    const fadeIn = setTimeout(() => {
      setStyle(prev => ({ ...prev, opacity: 0.7 }));
    }, style.delay * 1000);

    // Floating animation
    const startTime = Date.now();
    let animationFrame;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = (elapsed % style.duration) / style.duration;
      
      setStyle(prev => ({
        ...prev,
        y: (prev.y - 0.02) % 100,
        x: prev.x + Math.sin(progress * Math.PI * 2) * 0.3,
        rotation: prev.rotation + 0.5
      }));

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      clearTimeout(fadeIn);
      cancelAnimationFrame(animationFrame);
    };
  }, [style.delay, style.duration]);

  return (
    <span 
      ref={emojiRef}
      className="floating-emoji"
      style={{
        left: `${style.x}%`,
        top: `${style.y}%`,
        fontSize: `${style.size}px`,
        transform: `rotate(${style.rotation}deg)`,
        opacity: style.opacity,
        animationDuration: `${style.duration}s`,
        animationDelay: `${style.delay}s`,
        filter: `hue-rotate(${Math.random() * 360}deg)`
      }}
    >
      {emoji}
    </span>
  );
};

const LetterPage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [recipientName, setRecipientName] = useState("Friend");
  const emojis = ['🌸', '💖', '✨', '😊', '🤗', '🥺', '❤️', '😘', '😍', '🤩', '🌼', '🌺', '🌹', '💐', '🌷'];
  const letterRef = useRef(null);

  useEffect(() => {
    // Get name from URL if provided
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) setRecipientName(name);

    // Start animations
    setFadeIn(true);

    // Parallax effect on scroll
    const handleScroll = () => {
      if (letterRef.current) {
        const scrollY = window.scrollY;
        letterRef.current.style.setProperty('--scroll-y', `${scrollY * 0.1}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`letter-page ${fadeIn ? 'fade-in' : ''}`} ref={letterRef}>
      {/* Floating background emojis */}
      {Array.from({ length: 25 }).map((_, i) => (
        <FloatingEmoji key={i} emoji={emojis[Math.floor(Math.random() * emojis.length)]} />
      ))}

      <div className="letter-container">
        {/* Decorative elements */}
        <div className="corner-decoration top-left">🌸</div>
        <div className="corner-decoration top-right">💖</div>
        
        <header className="letter-header">
          <h1 data-aos="fade-down">A Letter Just for You</h1>
          <div className="underline" data-aos="fade-right"></div>
        </header>

        <div className="letter-content">
          <p className="greeting" data-aos="fade-right">My Dearest Kukka 🐶,</p>

          <div data-aos="fade-up">
            <p>First things first Kshemam ga velli, labham ga ra 💖.time ki thinu intlo unte lunch ki rakapoyina kuda aunty pedtharu but akkada ala kadhu so NEVER NEGLECT YOUR FOOD. I hope every step you take there is filled with warmth, and everything you deserve 😊. I know ni life lo imp ppl chala mandhi unnaru... but I hope, in some small way,nenu kuda gurthunta ane anukuntunna. 🙂</p><br></br>

            <p>Nijam cheppali ante… I didn't realize how much space you occupy in my everyday moments until the thought that u willn't be here for a month hits🙂. One month is nothing, they say. But for me? It's 30 sunrises without your good morning, 30 evenings without eating junk food together, 30 nights where I can't just send you a stupid text that starts a fight.</p>
          </div><br></br>
          <p>Sendoff iddam ani station vacha but avvaledhu😔inka this website… I know it's silly. Maybe you'll smile, maybe you think, "Ayya, enti idhi antha intha emotional aipothondi 😂" But I made it anyway.</p>

          <div className="highlight-box" data-aos="zoom-in">
            <p>Because I wanted to give you a tiny corner of the world where you're <em>always</em> celebrated. Where u feel special, where our memories don't fade, where you can feel me saying, "Miss u ra kukka" even when I'm not there.</p>
            <p>So when the nights feel too quiet, or the distance feels too heavy, come here. Let it remind you that somewhere, someone is keeping a light on for you. That your absence is felt deeply, and your return is waited for… eagerly.</p>
          </div>
          
          <div data-aos="fade-up">
            <p>Take care, ra. And please… come back with lots of stories. I'm all ears and super excited to listen all of them.</p>
            
            <p className="closing">With a hope that this letter brings a smile,</p>
            <p className="signature">GOWTHAMI <span className="heart-emoji">💖</span></p>
          </div>

          <div className="postscript" data-aos="fade-up">
            <p>P.S. If you don't message me at least once, I'll spam you with 100 "😾" emojis.</p>
          </div>
        </div>

        <div className="corner-decoration bottom-left">✨</div>
        <div className="corner-decoration bottom-right">🌹</div>
      </div>
    </div>
  );
};

export default LetterPage;
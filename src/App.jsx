import FlipBook from "./components/FlipBook";
import "./index.css";
import "./styles/book.css";

function App() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🕯️ Floating candles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="candle"
          style={{
            top: `${Math.random() * 80 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* ✨ Magical golden aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,100,0.15),transparent_70%)] pointer-events-none" />

      <FlipBook />
    </div>
  );
}

export default App;

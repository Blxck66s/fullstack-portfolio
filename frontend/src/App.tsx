import Hero from "./components/Hero";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <div className="flex h-full min-h-screen w-full min-w-screen flex-col items-center gap-4 p-5">
      <Hero />
      <div className="flex gap-2">
        <ModeToggle />
      </div>
    </div>
  );
}

export default App;

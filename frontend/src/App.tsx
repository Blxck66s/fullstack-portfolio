import Hero from "./components/Hero";
import { useTheme } from "./components/theme-provider";

function App() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <div className="flex h-full min-h-screen w-full min-w-screen flex-col items-center gap-4 p-5">
      <Hero />

      <div className="flex gap-2">
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("system")}>System</button>
      </div>
    </div>
  );
}

export default App;

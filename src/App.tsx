import { useRenderingCount } from "./util";
import { create } from "./zustund";

const useBearStore = create({
  bears: 0,
  name: "bears",
}, (set) => ({
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  changeName: (name: string) => set({ name }),
  removeAllBears: () => set({ bears: 0 }),
}));

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Bears />
      <Name />
      <IncButton />
      <ChangeName />
      <Remove />
    </div>
  );
}

function Remove() {
  const r = useRenderingCount();
  const removeAllBears = useBearStore((state) => state.removeAllBears);
  return (
    <div>
      <div>rendered {r} times</div>
      <button onClick={removeAllBears}>remove all bears</button>
    </div>
  );
}

function Name() {
  const r = useRenderingCount();
  const name = useBearStore((state) => state.name);
  return (
    <div>
      <div>rendered {r} times</div>
      <p>{name}</p>
    </div>
  );
}

function ChangeName() {
  const r = useRenderingCount();
  const changeName = useBearStore((state) => state.changeName);

  return (
    <div>
      <div>rendered {r} times</div>
      <input
        type="text"
        onChange={(e) => {
          changeName(e.target.value);
        }}
      />
    </div>
  );
}

function IncButton() {
  const r = useRenderingCount();
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return (
    <div>
      <div>rendered {r} times</div>
      <button onClick={increasePopulation}>increment</button>
    </div>
  );
}

function Bears() {
  const r = useRenderingCount();
  const bears = useBearStore((state) => state.bears);
  return (
    <div>
      <div>rendered {r} times</div>
      <p>{bears} bears</p>
    </div>
  );
}

export default App;

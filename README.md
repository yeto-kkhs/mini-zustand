# mini-zustand

## できること

```tsx
// 型パズルが難しすぎたので、インターフェースを少し変えている（状態と更新関数を別々の引数にしている）
const useBearStore = create({
  bears: 0,
}, (set) => ({
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

function Bears() {
  const bears = useBearStore((state) => state.bears);
  return <p>{bears}</p>;
}

function Buttons() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);
  return (
    <div>
      <button onClick={increasePopulation}>increment</button>
      <button onClick={removeAllBears}>remove all</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Bears />
      <Buttons />
    </div>
  );
}
```

## memo

- store を作る
  - set 関数の中で listener を実行するようにしてやる
- store を useSyncExternalStore にポイッ

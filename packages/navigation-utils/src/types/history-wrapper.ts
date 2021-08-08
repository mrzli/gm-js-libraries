export interface HistoryWrapper {
  readonly back: () => void;
  readonly forward: () => void;
  readonly go: (delta: number) => void;
}

import { HistoryWrapper } from '../types/history-wrapper';

export function createHistoryWrapper(): HistoryWrapper {
  const history = window.history;
  return {
    back: () => history.back(),
    forward: () => history.forward(),
    go: (delta: number) => history.go(delta),
    push: (url: string) => history.pushState({}, '', url),
  };
}

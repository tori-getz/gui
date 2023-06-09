import type {
  IGlobalState,
  IGlobalStateManager,
  Subscriber
} from "./types";

declare global {
  interface Window {
    GuiGlobalState: IGlobalState
  }
}

export const globalStateManager = (): IGlobalStateManager => {
  const state = getGlobalState();

  const clearCursors = (): void => {
    state.states.cursor = 0;
    state.effects.cursor = 0;
    state.refs.cursor = 0;
  }

  const subscribe = (subscriber: Subscriber): void => {
    state.subscribers.push(subscriber);
  }

  const notify = (): void => {
    state.subscribers.forEach(subscriber => {
      subscriber();
    });
  }

  return {
    state,
    clearCursors,
    subscribe,
    notify,
  };
}

const getGlobalState = (): IGlobalState => {
  if (!(window as any).GuiGlobalState) {
    (window as any).GuiGlobalState = {
      states: {
        list: [],
        cursor: 0
      },
      effects: {
        list: [],
        cursor: 0,
      },
      refs: {
        list: [],
        cursor: 0,
      },
      subscribers: [],
    } as IGlobalState;
  }

  return (window as any).GuiGlobalState;
}

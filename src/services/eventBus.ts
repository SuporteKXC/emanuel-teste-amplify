export interface Registry {
  unsubscribe: () => void;
}

export interface Callable {
  [key: string]: Function;
}

export interface Subscriber {
  [key: string]: Callable;
}

export interface IEventBus {
  dispatch<T>(event: string, arg?: T): void;
  subscribe(event: string, callback: Function): Registry;
}

class EventBus implements IEventBus {
  private subscribers: Subscriber;
  private static nextId = 0;
  private static instance?: EventBus = undefined;

  private constructor() {
    this.subscribers = {};
  }

  public static getInstance(): EventBus {
    if (!this.instance) {
      this.instance = new EventBus();
    }
    return this.instance;
  }

  public dispatch<T>(event: string, arg?: T): void {
    const subscriber = this.subscribers[event];

    if (subscriber === undefined) {
      return;
    }

    Object.keys(subscriber).forEach((key) => subscriber[key](arg));
  }

  public subscribe(event: string, callback: Function): Registry {
    const id = this.getNextId();
    if (!this.subscribers[event]) {
      this.subscribers[event] = {};
    }

    this.subscribers[event][id] = callback;

    return {
      unsubscribe: () => {
        delete this.subscribers[event][id];
        if (Object.keys(this.subscribers[event]).length === 0) {
          delete this.subscribers[event];
        }
      },
    };
  }

  private getNextId(): number {
    return EventBus.nextId++;
  }
}

export const eventBus = EventBus.getInstance();

const storage = {};
const states = {};
const middlewares = {};

function activeMiddlewares(action, key, payload, store) {
  if (middlewares[key]) {
    middlewares[key].forEach((middle) => {
      middle(action, payload, store);
    });
  }
}

function gettter(store, instance, key) {
  const g = Object.defineProperty(instance, key, {
    value: store[key],
    writable: false,
    configurable: false,
    enumerable: true
  });

  return new Proxy(g, {
    set: () => {
      console.error("Getter fields not writable");
    }
  });
}

export function addStorage(key, object) {
  storage[key] = { ...storage[key], ...object };
}

export function newStorage(key, initial) {
  storage[key] = initial;
}

export function getStorage(key) {
  return gettter(storage, { ...storage[key] }, key);
}

export function createActionTo(key) {
  return {
    state: (action) => {
      states[`"${action}"`] = { [key]: storage[key] };
    },
    store: key
  };
}

export function getState(key, action) {
  const act = states[`"${action}"`];
  return gettter(act, { ...act[key] }, key);
}

export async function dispatch(params, payload) {
  if (`"${params.state}"` in states) {
    const act = states[`"${params.state}"`][params.store];

    activeMiddlewares(params.state, params.store, payload, act);

    states[`"${params.state}"`][params.store] = {
      ...act,
      ...payload
    };
    document.dispatchEvent(
      new CustomEvent("store.update", {
        detail: {
          action: params.state,
          payload: act
        }
      })
    );
  } else {
    console.error("action not found");
  }
}

export function changeState(action, fn) {
  document.addEventListener("store.update", (e) => {
    if (e.detail.action === action) {
      fn(e.detail.payload);
    }
  });
}

export function initialActions(store, actions) {
  actions.forEach((item) => {
    store.state(item);
  });
}

export function middleware(store) {
  const s = store.store;
  return {
    add: (fn) => {
      if (middlewares[s]) {
        middlewares[s].push(fn);
      } else {
        middlewares[s] = [fn];
      }
    }
  };
}

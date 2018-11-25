const installHook = (target) => Object.defineProperty(target, '__SIMPLY_REDUX__', {
  get() {
    return ({ dispatch, getState } = {}) => {
      return ({ getState }) => next => (action) => {

        const entry = {};
        // entry.started = new Date();
        entry.previousState = getState();
        entry.action = action;

        const returnedValue = next(action);

        // entry.took = timer.now() - entry.started;
        entry.nextState = getState();

        window.postMessage({
          source: 'simply-redux',
          action: entry
        }, '*')

        return returnedValue;
      };
    };
  }
});

const script = document.createElement('script')
script.textContent = ';(' + installHook.toString() + ')(window)'

document.documentElement.appendChild(script)
script.parentNode.removeChild(script)

const installHook = (target) => Object.defineProperty(target, '__SIMPLY_REDUX__', {
  get() {
    return ({ dispatch, getState } = {}) => {
      return ({ getState }) => next => (action) => {

        const logEntry = {};
        logEntry.started = new Date();
        logEntry.prevState = getState();
        logEntry.action = action;

        const returnedValue = next(action);

        //logEntry.took = timer.now() - logEntry.started;
        logEntry.nextState = getState();

        window.postMessage({
          source: 'simply-redux',
          payload: logEntry
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

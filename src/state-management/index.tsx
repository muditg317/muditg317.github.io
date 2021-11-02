import React, {createContext, useReducer} from 'react';

import rootReducer, { initialState } from './reducers';


const store = createContext(initialState);
const { Provider } = store;

export function StateProvider({children}: React.PropsWithChildren<{}>) {
  const [ state, dispatch ] = useReducer(rootReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store };

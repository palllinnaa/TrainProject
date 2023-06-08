import rootReducer from "./reducers/rootReducer"
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import mySaga from "./saga"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(mySaga)
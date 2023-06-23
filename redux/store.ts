import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { authSaga, productSaga, reviewSaga, storeSaga, userSaga } from "../server/constants"

export const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(userSaga.myUserSaga)
sagaMiddleware.run(authSaga.myAuthSaga)
sagaMiddleware.run(storeSaga.myStoreSaga)
sagaMiddleware.run(reviewSaga.myReviewSaga)
sagaMiddleware.run(productSaga.myProductSaga)
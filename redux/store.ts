import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import userSaga from '../redux/models/user'
import authSaga from '../redux/models/auth'
import storeSaga from '../redux/models/store'
import reviewSaga from '../redux/models/review'
import productSaga from '../redux/models/product'

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
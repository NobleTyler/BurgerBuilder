import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import thunk from 'redux-thunk'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
import createSagaMiddleware from 'redux-saga'
import {watchAuth,watchBurgerBuilder} from './store/sagas/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order:orderReducer,
  auth:authReducer
})

const sagaMiddleware = createSagaMiddleware()


const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk,sagaMiddleware)
))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)

const app = (
  <Provider store ={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()

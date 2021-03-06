import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import CartScreen from './screens/CartScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import SigninScreen from './screens/SigninScreen.js'
import { signout } from './actions/userActions.js'

function App () {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const userSingin = useSelector((state) => state.userSignin)
  const { userInfo } = userSingin
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header className='row'>
          <div>
            <Link className='brand' to='/'>amazona</Link>
          </div>
          <div>
            <Link to='/cart'>Cart
              {cartItems.length > 0 && (
                <span className='badge'>{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className='dropdown'>
                <Link to='#'>{userInfo.name} <i className='fa fa-caret-down'></i></Link>
                <ul className='dropdown-content'>
                  <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                </ul>
              </div>
            ) : (
              <Link to='/signin'>Sing In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/signin' component={SigninScreen} />
          <Route path='/' component={HomeScreen} exact />
        </main>
        <footer className='row center'>All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App

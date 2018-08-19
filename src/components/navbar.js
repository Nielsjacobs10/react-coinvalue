import React from 'react';
// import ReactDOM from 'react-dom';
import '../styles/navbar.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
import Hidden from '../components/hidden';
  const NavComponent = () => (
    <Router>
      <div>
        <AuthButton />
        <nav>
       
            <div className="navWide">
                <div className="wideDiv">
                <Link to="/">homepage</Link>
                <Link to="/protected">Welke munt kopen?</Link>
                </div>
            </div>
        </nav>

        <Route path="/" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Hidden} />
      </div>
    </Router>
  );
  
  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };
  
  const AuthButton = withRouter(
    ({ history }) =>
      fakeAuth.isAuthenticated ? (
        <p>
          Welcome!{" "}
          <button
            onClick={() => {
              fakeAuth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p className="tip">Log in voor een tip!.</p>
      )
  );
  
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
  
  const Public = () => <h3>Welkom op een demo pagina van (advanced) react routing. log in om een Tip te krijgen over cryptomunten</h3>;
  
  class Login extends React.Component {
    state = {
      redirectToReferrer: false
    };
  
    login = () => {
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };

    render() {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      const { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) {
        return <Redirect to={from} />;
      }
  
      return (
        <div className="login">
          <p>Login in om de tip te krijgen {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
        </div>
      );
    }
  }
  
        
	

export default NavComponent;
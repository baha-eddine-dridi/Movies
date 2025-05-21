import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      showMessage: false
    };
  }

  componentDidMount() {
    // Show the message after component mount
    this.setState({ showMessage: true });
    
    // Set up redirect after 3 seconds
    this.redirectTimer = setTimeout(() => {
      this.setState({ redirect: true, showMessage: false });
    }, 3000);
  }

  componentWillUnmount() {
    // Clean up timer when component unmounts
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
  }

  render() {
    // Redirect to Movies page if state.redirect is true
    if (this.state.redirect) {
      return <Navigate to="/movies" replace />;
    }

    return (
      <div className="container text-center mt-5">
        <h1 className="display-1">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        
        {this.state.showMessage && (
          <div className="alert alert-info mt-4">
            Redirect to Movies page
          </div>
        )}
        
        <p className="mt-3">You will be redirected to the Movies page in 3 seconds...</p>
      </div>
    );
  }
}

export default NotFound;
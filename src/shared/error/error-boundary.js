import React from 'react';

class ErrorBoundary extends React.Component{
   state = { error: undefined, errorInfo: undefined };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      const errorDetails =
         ( 
					<details className="preserve-space"> 
						{error && error.toString()} 
						<br /> 
						{errorInfo.componentStack}
					</details>
        )
      return (
        <div>
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

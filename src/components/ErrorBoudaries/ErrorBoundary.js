import React from "react";

function ErrorBoundary (props) {
  if (props.error) {
    return (
      <div className="error-screen">
        <h2>An error has occured</h2>
        <h4>{props.error.message}</h4>
      </div>
    )
  } else {
    return <React.Fragment>{props.children}</React.Fragment>
  }
}

export default ErrorBoundary;
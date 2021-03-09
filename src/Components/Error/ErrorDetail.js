import React from "react";

function ErrorDetail({errorMessage, componentName}){
     
    return (
            <div className="card my-5">
              <div className="card-header">
                <p>
                  There was an error in {componentName} component.{' '}
                  <span
                    style={{ cursor: 'pointer', color: '#0077FF' }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Reload this page
                  </span>{' '}
                </p>
              </div>
              <div className="card-body">
                <details className="error-details">
                  <summary>Click for error details</summary>
                  {errorMessage}
                </details>
              </div>
            </div>
          );      

}

export default ErrorDetail;
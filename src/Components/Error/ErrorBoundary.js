import React from "react";
import ErrorDetail from "./ErrorDetail";
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: '', errorInfo: '', hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
        this.setState({errorInfo})
    }

    render() {
        const { hasError, error } = this.state;
        if (hasError) {            
            return <ErrorDetail errorMessage={error.message} componentName="this"></ErrorDetail>
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
  };
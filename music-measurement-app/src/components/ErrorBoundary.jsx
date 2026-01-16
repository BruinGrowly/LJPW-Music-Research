import { Component } from 'react'

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error)
    console.error('Component stack:', errorInfo.componentStack)

    this.setState({ errorInfo })

    // Could send to error reporting service here
    // e.g., Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-fallback" role="alert" aria-live="assertive">
          <div className="error-icon" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h2>Something went wrong</h2>

          <p className="error-message">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>

          {this.props.showDetails && this.state.errorInfo && (
            <details className="error-details">
              <summary>Technical details</summary>
              <pre>
                {this.state.error?.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}

          <div className="error-actions">
            <button
              onClick={this.handleReset}
              className="error-button secondary"
              aria-label="Try again without reloading the page"
            >
              Try Again
            </button>
            <button
              onClick={this.handleReload}
              className="error-button primary"
              aria-label="Reload the entire page"
            >
              Reload Page
            </button>
          </div>

          <p className="error-help">
            If this keeps happening, try refreshing the page or{' '}
            <a
              href="https://github.com/anthropics/claude-code/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              report the issue
            </a>
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Wrapper component for catching errors in specific sections
 * without crashing the entire app
 */
export function SectionErrorBoundary({ children, sectionName }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="section-error" role="alert">
          <p>
            Unable to load {sectionName || 'this section'}.
            Please try refreshing the page.
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundary

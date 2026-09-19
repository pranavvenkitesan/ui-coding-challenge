import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

export default function RouteErrorPage() {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error'

  return (
    <section role="alert" className="app-main">
      <h1>Something went wrong</h1>
      <p>{message}</p>
      <Link to="/">Back to home</Link>
    </section>
  )
}

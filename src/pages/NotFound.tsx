import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="wrap py-24">
      <p className="kicker">404</p>
      <h1 className="display mt-3 text-5xl">This page is not on the site.</h1>
      <Link className="btn btn-primary mt-6" to="/">
        Back home
      </Link>
    </div>
  )
}

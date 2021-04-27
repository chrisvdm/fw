const Route = ({ path, Page }) => {
  if (!!window) {
    if (window.location.pathname === path) {
      return <Page />
    } else {
      return null
    }
  }
}

export default Route

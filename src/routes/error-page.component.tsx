import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText}</i>
        </p>
        <Link to={"/"}>Come back home!</Link>
      </div>
    );
  }
  return <div>Oops</div>;
};

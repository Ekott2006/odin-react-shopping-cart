import { useRouteError } from "react-router-dom";
import Image from "../assets/pexels-shattha-pilabut-38930-135620.jpg";

export default function ErrorBoundary() {
  let error = useRouteError();
  return (
    <div
      className="error"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${Image})`,
      }}
    >
      <div>
        <h1>{error.message ?? error.data}</h1>
        <a href="/">Link to Home</a>
      </div>
    </div>
  );
}

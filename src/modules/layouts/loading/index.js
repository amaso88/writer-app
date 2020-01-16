import React from "react";
import { Spinner } from "reactstrap";

export default function Loading() {
  return (
    <Spinner animation="border" role="status" variant="primary">
      Loading...
    </Spinner>
  );
}

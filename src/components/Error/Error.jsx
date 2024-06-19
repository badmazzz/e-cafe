import React from 'react'

export default function ErrorCheck({error}) {
  return (
    <div className="alert alert-danger my-3" role="alert">
      {error}
    </div>
  );
}

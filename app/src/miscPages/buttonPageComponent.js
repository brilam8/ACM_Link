import React from 'react';
import { useParams } from 'react-router-dom';

function ButtonPage() {
  const params = useParams();
  return (
    <div>
      <div>{params.UID}</div>
      <div>{params.firstName}</div>
    </div>
  );
}

export default ButtonPage;
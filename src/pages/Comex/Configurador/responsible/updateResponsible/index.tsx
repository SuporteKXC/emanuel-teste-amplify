import { UpdateResponsibleForm } from 'components'
import { Scaffold } from 'layouts'
import React from 'react'
import { useLocation } from 'react-router-dom'

export const UpdateResponsible = () => {
    const location = useLocation();
    const data = location.state;
  return <UpdateResponsibleForm />;
}

export default UpdateResponsible
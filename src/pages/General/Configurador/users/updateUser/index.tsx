import { UpdateUserForm } from 'components'
import { Scaffold } from 'layouts'
import React from 'react'
import { useLocation } from 'react-router-dom'

export const UpdateUser = () => {
    const location = useLocation();
    const data = location.state;
  return <UpdateUserForm />;
}

export default UpdateUser
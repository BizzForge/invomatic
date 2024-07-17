import React from 'react'
import Console from '../tempates/console/console'
import PrivateRoute from './PrivateRoute';

export default function Dashboard() {
  return (
    <PrivateRoute>
      <Console>this is the dashboard page</Console>
    </PrivateRoute>
  )
}

import React, { useContext } from 'react'
import { Context } from '../contexts/SharedState';

export default function Alerts() {
  const states = useContext(Context);
  return (
    <>
    <div className="alertbox container col-md-4 text-center fixed-top" style={{ zIndex: 100, marginTop: '80px' }}>
        {states.alert && <div className={`alert fade show`} style={{ background: states.alert.type }} role="alert">
        <strong>{states.alert.msg}</strong> </div>}
    </div>
    </>
  )
}

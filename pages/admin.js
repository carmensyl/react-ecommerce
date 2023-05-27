import React from "react"
import SignUp from "../components/formComponents/SignUp"
import ConfirmSignUp from "../components/formComponents/ConfirmSignUp"
import SignIn from "../components/formComponents/SignIn"
import Inventory from "../components/Inventory"

import React, { useEffect, useState } from "react"

function Admin() {
  const [formState, setFormState] = useState("signUp")
  const [isAdmin, setIsAdmin] = useState(false)

  const toggleFormState = (state) => {
    setFormState(state)
  }

  useEffect(() => {
    const checkSignInStatus = async () => {
      // check and update signed in state
    }

    checkSignInStatus()
  }, [])

  const signUp = async (form) => {
    const { username, email, password } = form
    // sign up
    setFormState("confirmSignUp")
  }

  const confirmSignUp = async (form) => {
    const { username, authcode } = form
    // confirm sign up
    setFormState("signIn")
  }

  const signIn = async (form) => {
    const { username, password } = form
    // signIn
    setFormState("signedIn")
    setIsAdmin(true)
  }

  const signOut = async () => {
    // sign out
    setFormState("signUp")
  }

  const renderForm = (state) => {
    switch (state) {
      case "signUp":
        return <SignUp signUp={signUp} toggleFormState={toggleFormState} />
      case "confirmSignUp":
        return <ConfirmSignUp confirmSignUp={confirmSignUp} />
      case "signIn":
        return <SignIn signIn={signIn} toggleFormState={toggleFormState} />
      case "signedIn":
        return isAdmin ? <Inventory signOut={signOut} /> : <h3>Not an admin</h3>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col">
      <div className="max-w-fw flex flex-col">
        <div className="pt-10">
          <h1 className="text-5xl font-light">Admin Panel</h1>
        </div>
        {renderForm(formState)}
      </div>
    </div>
  )
}

export default Admin

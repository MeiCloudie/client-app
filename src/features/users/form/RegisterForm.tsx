import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Formik } from "formik"
import { UserFormValues } from "../../../app/models/User";
import React from "react"


const RegisterForm = observer(() => {
    const { userStore } = useStore()
    const [user, setUser] = React.useState<UserFormValues>()
    return (<></>)
})
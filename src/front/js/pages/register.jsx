import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const initialUser = {
    name: "",
    email: "",
    password: "",
    avatar: ""
}

const Register = () => {

    const [user, setUser] = useState(initialUser)
    const { actions } = useContext(Context)

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()


        const formData = new FormData()
        formData.append("name", user.name)
        formData.append("email", user.email)
        formData.append("password", user.password)
        formData.append("avatar", user.avatar)

        const response = await actions.register(formData)

        if (response == 200) {
            setUser(initialUser)
            alert("El usuario se registro correctamente")
        } else if (response == 400) {
            alert("El usuario ya existe")
        } else {
            alert("Intentelo mas tarde")
        }

    }

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <h1 className="text-center">Register</h1>
                <div className="col-12 col-md-6">
                    <form
                        onSubmit={handleSubmit}
                        className="border p-3 mt-3">
                        <div className="form-group mt-3">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}

                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Correo electronico</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}

                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Imagen de perfil</label>
                            <input
                                type="file"
                                className="form-control"
                                placeholder="Picture"
                                // value={user.file}
                                onChange={(event) => {
                                    setUser({ ...user, avatar: event.target.files[0] })
                                }}
                            />
                        </div>
                        <button className="btn btn-primary mt-3 w-100">Registarme</button>
                    </form>
                    <div className="text-center">
                        <p className="m-0">
                            ¿ Tienes una cuenta? <Link to="/login">Entrar</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register
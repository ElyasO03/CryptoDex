import {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {connect } from 'react-redux'

function LoginUi(props) {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        
        fetch('http://localhost:8080/cryptodex/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(result => {

            if(result.success) {
                const token = result.token
                const username = result.name
                localStorage.setItem('jwt', token)
                localStorage.setItem('username', username)

                props.onLogin(token)

                navigate('/')
            }
            console.log(result)
        })
    }

return(
    <>
    <input onChange = {handleOnChange} name= "username" type= "text" placeholder="Enter Username" />
    <input onChange = {handleOnChange} name= "password" type= "text" placeholder="Enter Password" />
    <button onClick={handleSubmit}>Login</button>
    </>
)

}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({type: 'ON_LOGIN', payload: token})
    }
}

export default connect(null, mapDispatchToProps)(LoginUi)

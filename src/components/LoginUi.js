import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import '../components/LoginUi.css'

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
        if (!user.username || !user.password) {
            alert('Please fill out all textboxes.')
        } else {
            fetch('http://localhost:8080/cryptodex/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(result => {

                    if (result.success) {
                        const token = result.token
                        const username = result.name
                        localStorage.setItem('jwt', token)
                        localStorage.setItem('username', username)

                        props.onLogin(token)

                        navigate('/')
                    } else {
                        alert('the user name or password is incorrect. try again')
                    }
                    console.log(result)

                })
        }
    }

    return (
        <>
            <div className='body'>
                <div className='box'>
                    <div className='form'>
                        <h2>Login</h2>
                        <div className='inputBox'>
                            <input minLength={4} maxLength={16} onChange={handleOnChange} name="username" type="text" required="required" />
                            <span>Username</span>
                            <i></i>
                        </div>
                        <div className='inputBox'>
                            <input minLength={4} maxLength={16} onChange={handleOnChange} name="password" type="password" required="required" />
                            <span>Password</span>
                            <i></i>
                        </div>
                        <div className='links'>
                            <a href='/register'>Sign Up</a>
                        </div>
                        <button onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({ type: 'ON_LOGIN', payload: token })
    }
}

export default connect(null, mapDispatchToProps)(LoginUi)

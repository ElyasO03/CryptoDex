import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function RegisterUi() {

    const navigate = useNavigate()
    const [user, setUser] = useState([])

    const handleChange = (e) => {
        setUser({
           ...user,
           [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = () => {
        if(!user.username || !user.password) {
            alert('Please fill out all textboxes.')
        } else {
        fetch('http://localhost:8080/cryptodex/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.username,
                password: user.password
            })
        }).then(response => response.json())
        .then(result => {
            if(result.error) {
                return
            } else {
                navigate('/login')
            }
        
        })}
        }
    


    return (
    <>
    <div className='body'>
        <div className='box'>
            <div className='form'>
        <h2>Register</h2>
        <div className='inputBox'>
        <input minLength={4} maxLength={16} onChange={handleChange} type='text' name='username' />
        <span>Enter A Username</span>
        <i></i>
        </div>
        <div className='inputBox'>
        <input minLength={4} maxLength={16} onChange={handleChange} type='text' name='password' />
        <span>Password</span>
        <i></i>
        </div>
        <div className='links'>
            <a href='/login'>Login</a>
        </div>
        <button onClick={handleSubmit} >Register</button>
        </div>
        </div>
     </div>
    </>
    )
    
}


export default RegisterUi
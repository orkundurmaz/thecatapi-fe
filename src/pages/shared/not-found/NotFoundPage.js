import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigator = useNavigate();
    setTimeout(() => navigator("/"), 2000)
    return (
        <div className="flex-col-center">
            <h2>Ooops...</h2>
            <h3>There is nothing here</h3>
            <p>You will be directed to home page.</p>
        </div>
    )
}

export default NotFoundPage
import React from 'react'

const ContactPage = () => {
    return (
        <div className="flex-col-center" style={{ gap: 20 }}>
            <h2>Contact us</h2>
            <p style={{ textAlign: "justify", padding: "0 20px" }}>Lorem ipsum dolor sit amet.</p>
            <a href="mailto:info@roi-ai.com" className="btn btn-outline">Send e-mail</a>
        </div>
    )
}

export default ContactPage
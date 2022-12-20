import React, { useState } from 'react'

interface IContactForm
{
    name: string | undefined
    email: string | undefined
    comments: string | undefined
}

interface IErrors
{
    nameError: string | undefined
    emailError: string | undefined
    commentsError: string | undefined
}

const ContactFormSection = () => {
    const [contactForm, setContactForm] = useState<IContactForm>({ name: '', email: '', comments: '' })
    const [errors, setErrors] = useState<IErrors>({ nameError: '', emailError: '', commentsError: '' })
    const [submitted, setSubmitted] = useState(false)
    const [failedSubmit, setFailedSubmit] = useState(false)

    const validateName = (name: string | undefined) => {
        var error = undefined

        if(!name)
            error = "You must enter a name"

        return error;
    }

    const validateEmail = (email: string | undefined) => {
        var error = undefined
        const regex_email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if(!email)
            error = "You must enter an email address"
        else if(!regex_email.test(email))
            error = "You must enter a valid email address (eg. name@domain.com"

        return error;
    }

    const validateComments = (comments: string | undefined) => {
        var error = undefined

        if(!comments)
            error = "You must enter a comment"
        else if(comments.length < 5)
            error = "Your comment must contain at least five characters"

        return error;
    }

    const handleNameChange = (e: { target: { id: any; value: any } }) => {
        const {id, value} = e.target
        setContactForm({ ...contactForm, [id]: value })
        setErrors({ ...errors, nameError: validateName(value)})
    }

    const handleEmailChange = (e: { target: { id: any; value: any } }) => {
        const {id, value} = e.target
        setContactForm({ ...contactForm, [id]: value })
        setErrors({ ...errors, emailError: validateEmail(value) })
    }

    const handleCommentsChange = (e: { target: { id: any; value: any } }) => {
        const {id, value} = e.target
        setContactForm({ ...contactForm, [id]: value })
        setErrors({ ...errors, commentsError: validateComments(value) })
    }

    const handleSubmit = (e: { preventDefault: () => void }) =>
    {
        e.preventDefault()

        let name = contactForm.name
        let email = contactForm.email
        let comments = contactForm.comments

        let nameError = validateName(name)
        let emailError = validateEmail(email)
        let commentsError = validateComments(comments)

        setErrors({ nameError: nameError, emailError: emailError, commentsError: commentsError })

        if (nameError === undefined && emailError === undefined && commentsError === undefined)
        {
            var jsonData = JSON.stringify({ name, email, comments })
        
            setContactForm({ name: '', email: '', comments: '' })
            setErrors({ nameError: '', emailError: '', commentsError: '' })
        
            fetch("https://win22-webapi.azurewebsites.net/api/contactform",
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type": "application/json"
                    },
                    body: jsonData
                })
            .then(result => {
                if (result.status === 200) {
                    setSubmitted(true)
                    setFailedSubmit(false)
                }
                else {
                    setSubmitted(false)
                    setFailedSubmit(true)
                }
            })
        }
        else
        {
            setSubmitted(false)
        }
    }

    return (
        <section className="contact-form">
            <div className="container">
                {
                    failedSubmit ?
                    (
                        <div>
                            <div className="alert alert-danger text-center">
                                <h1>Failed to submit!</h1>
                            </div>
                        </div>)
                        :
                        (<></>)
                }

                {
                    submitted ?
                    (<div>
                        <div className ="submit-message">
                            <h1>Thank you for your comment!</h1>
                        </div>
                        </div>)
                    :
                    (
                    <>
                        <h2>Come in Contact with Us</h2>
                        <form onSubmit={handleSubmit} noValidate>
                            <div>
                                <input id="name" type="text" placeholder="Your Name" value={contactForm.name} onChange={handleNameChange} />
                                <div className="errorMessage">{errors.nameError}</div>
                            </div>
                            <div>
                                <input id="email" type="email" placeholder="Your Mail" value={contactForm.email} onChange={handleEmailChange}/>
                                <div className="errorMessage">{errors.emailError}</div>
                            </div>
                            <div className ="textarea">
                                <textarea id="comments" placeholder="Comments" value={contactForm.comments} onChange={handleCommentsChange}></textarea>
                                <div className="errorMessage">{errors.commentsError}</div>
                            </div>
                            <div className="formBtn">
                                <button type="submit" className="btn-theme">Post Comments</button>
                            </div>
                        </form>
                    </>
                    )  
                }

            </div>
        </section>
    )
}

export default ContactFormSection
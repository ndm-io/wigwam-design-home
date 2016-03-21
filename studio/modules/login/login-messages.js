module.exports = {
    info: {
        message: 'Logging in is easy, we just need an email address. We then send you an activation link and your set',
        state: 'info'
    },
    sending: {
        message: 'Just a second... We are preparing and sending your one time token.',
        state: 'sending'
    },
    success: {
        message: 'Go check your email... your one time activation link has been sent. Just click the link and your logged in',
        state: 'success'
    },
    invalid: {
        message: "That doesn't look like a valid email address",
        state: 'invalid'
    },
    error: {
        message: "Oh no! We couldn't send you a new code... There seems to be a problem with your account",
        state: 'error'
    }
};
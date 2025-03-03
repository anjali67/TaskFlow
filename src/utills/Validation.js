export const ValidateName = (name) => {
    if(!name.trim()) {
        return 'Please enter name'
    }
}

export const ValidateEmail = (email) => {
    const pattern = /^[^@]+@[^@]+\.[^@]+$/
    if(!email.trim()) {
        return "Please enter Email"
    }
    if(!pattern.test(email)) {
        return "Please enter valid email"
    }
    return null
}

export const ValidPassword = (password) => {
     if(!password.trim()) {
         return "Please enter password"
     } 

     if(password.length < 6) {
        return "Please enter minimum 6 character"
     }

     return null
}

export const ValidateConfirmPassword = (password,confirmPassword) => {
    if(!confirmPassword.trim()) {
        return "Please enter confirm password"
    }

    if(password !== confirmPassword) {
        return "Password and confirmPassword should be match"
    }

    return null
}
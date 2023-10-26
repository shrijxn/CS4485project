import re

# Checks if the password is long enough and contains a number.
# Returns a string saying it valid, if flag is false, return an 'error' message.
def strongPassword(password):
    flag = True
    errormessage = ""
    if len(password) < 8:
        flag = False
        errormessage = "The password has to have more at least 8 characters.\n"
    if not any(i.isdigit() for i in password):
        flag = False
        errormessage = "The password needs to contain a number.\n"
    if flag:
        return 'valid'
    else:
        return errormessage


# Checks if the email follows normal naming conventions.
# Returns a string saying it valid, if not, return an 'error' message.
def validEmail(email):
    errormessage = ""
    validatorstring = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if re.match(validatorstring, email):
        return 'valid'
    else:
        errormessage = 'Email is invalid'
        return errormessage


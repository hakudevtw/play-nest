
### Password hashing
- hashed string cannot be undo or reversed
- running the same hashing function will always get the same result
- the sign in password will also be hashed by the same hashing function and compare with the user password saved in db
- common password combinations can be easily hacked without salting
  - rainbow table attack - a list of most common password in the world with the hashed result, will be able to look into the hashed password in db
- salting
  - signup
    - join some random string(salt) into the user password
    - hash the joined result
    - take the hashed result and join with the random string with period
    - save to db
  - signin
    - use the email to get password from db
    - separate the hash and the salt
    - join the input password with the salt
    - hash the joined value
    - compare
- hacker will have to generate different tables by guessing different salts, not possible!

### Session and Cookies
- use session-cookie library to implement authentication
- after signing in or signup, the session is saved in the cookie and sent back in response, next time on request
  - cookie-session looks at the `Cookie` header
  - cookie-session decodes the string resulting in an object
  - access the session object in request handler using decorator
  - add/remove/change the session object
  - cookie-session sees the updated session and turns it into encrypted string
  - cookie session only send back cookie in response if the session object is updated

### Combine decorator and interceptor to get current user in route params
- Implementation
  - interceptor gets the user id from session and request user instance
  - interceptor injects the user instance into the request object
  - decorator param gets user instance from request object (context)
- Usage 1 (controller scoped interceptors) -> need to add to all controllers separately
  - add interceptor to user providers in users module
  - add @UseInterceptors(CurrentUserInterceptor) to user controller on controller level
  - use @CurrentUser param in routes that needs access to the user instance
- Usage 2 (global scoped interceptors) -> fetch user even not needed
  - add CurrentUserInterceptor as APP_INTERCEPTOR to users module
  - this will apply to all controllers under user module
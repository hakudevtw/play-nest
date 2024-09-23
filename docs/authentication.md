
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
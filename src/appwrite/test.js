// Import your AuthService
import authService from './auth';

// Mock user data for testing (replace these with your test data)
const userEmail = 'adityaam20.comp@coep.ac.in';
const enteredCode = '123456'; // Simulated entered code
const password = 'testPassword123'; // Simulated password

// Test the signup process
authService.signupProcess(userEmail, enteredCode, password)
  .then((userAccount) => {
    if (userAccount) {
      console.log('User account created:', userAccount);
    } else {
      console.log('Signup failed. Code verification unsuccessful.');
    }
  })
  .catch((error) => {
    console.error('Signup error:', error);
  });

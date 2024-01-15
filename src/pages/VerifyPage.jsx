import { useEffect, useState } from 'react';
import authService from '../appwrite/auth';

export default function Login() {
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'success', or 'error'

  useEffect(() => {
    const verify = async () => {
      try {
        await authService.completeverification();
        setVerificationStatus('success');
      } catch (error) {
        console.log(error);
        setVerificationStatus('error');
      }
    };

    verify();
  }, []);

  return (
    <div>
      {verificationStatus === 'pending' && <div>Verifying...</div>}
      {verificationStatus === 'success' && <div>Verification completed!</div>}
      {verificationStatus === 'error' && <div>Verification failed. Please try again.</div>}
    </div>
  );
}

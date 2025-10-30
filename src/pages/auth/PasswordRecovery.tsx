import React, { useState } from 'react';
import { 
  Mail, Lock, ArrowRight, CheckCircle, AlertCircle, 
  ArrowLeft, Eye, EyeOff, Shield, Key
} from 'lucide-react';

type Step = 'request' | 'verification' | 'reset' | 'success';

const PasswordRecovery: React.FC = () => {
  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('verification');
    }, 1500);
  };

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('reset');
    }, 1500);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };

  const handleResendCode = () => {
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Verification code has been resent to your email');
    }, 1000);
  };

  return (
    <div className="min-h-screen mt-[12vh] bg-gradient-to-br from-green-50 via-white to-purple-50">
 

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step === 'request' ? 'border-green-600 bg-green-600 text-white' :
                  ['verification', 'reset', 'success'].includes(step) ? 'border-green-600 bg-green-600 text-white' :
                  'border-gray-300 bg-white text-gray-400'
                }`}>
                  {['verification', 'reset', 'success'].includes(step) ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <span className="text-xs mt-2 text-gray-600">Request</span>
              </div>
              <div className={`flex-1 h-0.5 ${
                ['verification', 'reset', 'success'].includes(step) ? 'bg-green-600' : 'bg-gray-300'
              }`}></div>
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step === 'verification' ? 'border-green-600 bg-green-600 text-white' :
                  ['reset', 'success'].includes(step) ? 'border-green-600 bg-green-600 text-white' :
                  'border-gray-300 bg-white text-gray-400'
                }`}>
                  {['reset', 'success'].includes(step) ? <CheckCircle className="w-5 h-5" /> : '2'}
                </div>
                <span className="text-xs mt-2 text-gray-600">Verify</span>
              </div>
              <div className={`flex-1 h-0.5 ${
                ['reset', 'success'].includes(step) ? 'bg-green-600' : 'bg-gray-300'
              }`}></div>
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step === 'reset' ? 'border-green-600 bg-green-600 text-white' :
                  step === 'success' ? 'border-green-600 bg-green-600 text-white' :
                  'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step === 'success' ? <CheckCircle className="w-5 h-5" /> : '3'}
                </div>
                <span className="text-xs mt-2 text-gray-600">Reset</span>
              </div>
            </div>
          </div>

          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Step 1: Request Password Reset */}
            {step === 'request' && (
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Key className="w-8 h-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                  <p className="text-gray-600">No worries, we'll send you reset instructions.</p>
                </div>

                <form onSubmit={handleRequestReset}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-red-700">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isLoading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="w-full flex items-center justify-center space-x-2 mt-4 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Login</span>
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Verification Code */}
            {step === 'verification' && (
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
                  <p className="text-gray-600">
                    We sent a verification code to<br />
                    <span className="font-medium text-gray-900">{email}</span>
                  </p>
                </div>

                <form onSubmit={handleVerificationSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                      Enter 6-digit code
                    </label>
                    <div className="flex justify-center space-x-2">
                      {verificationCode.map((digit, index) => (
                        <input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleVerificationChange(index, e.target.value)}
                          className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-red-700">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isLoading ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <span>Verify Code</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Didn't receive the code?{' '}
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Resend
                      </button>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('request')}
                    className="w-full flex items-center justify-center space-x-2 mt-4 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Change Email</span>
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Reset Password */}
            {step === 'reset' && (
              <div>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Lock className="w-8 h-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Set New Password</h1>
                  <p className="text-gray-600">Your new password must be different from previous passwords.</p>
                </div>

                <form onSubmit={handlePasswordReset}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Password must contain:</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <span className={newPassword.length >= 8 ? 'text-green-600' : 'text-gray-400'}>
                          {newPassword.length >= 8 ? '✓' : '○'}
                        </span>
                        <span>At least 8 characters</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className={/[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-gray-400'}>
                          {/[A-Z]/.test(newPassword) ? '✓' : '○'}
                        </span>
                        <span>One uppercase letter</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className={/[0-9]/.test(newPassword) ? 'text-green-600' : 'text-gray-400'}>
                          {/[0-9]/.test(newPassword) ? '✓' : '○'}
                        </span>
                        <span>One number</span>
                      </li>
                    </ul>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-red-700">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isLoading ? (
                      <span>Resetting...</span>
                    ) : (
                      <>
                        <span>Reset Password</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 'success' && (
              <div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">Password Reset Successfully!</h1>
                  <p className="text-gray-600 mb-8">
                    Your password has been reset successfully. You can now log in with your new password.
                  </p>

                  <button
                    onClick={() => window.location.href = '/login'}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium transition"
                  >
                    <span>Go to Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="mt-8 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900 mb-1">Security Tip</p>
                        <p className="text-sm text-gray-600">
                          Make sure to use a strong, unique password and enable two-factor authentication for added security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-green-600 hover:text-green-700 font-medium">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
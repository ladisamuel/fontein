import React, { useEffect, useState } from "react";
import { Mail, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";

const AccountVerifyCodePage: React.FC = () => {
  const params = useParams();

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = "ava.johnson@example.com"; // This would come from previous page

  const handleChange = (index: number, value: string) => {
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

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const code = verificationCode.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to reset password page
      window.location.href = "/reset-password";
    }, 1500);
  };

  const handleResendCode = () => {
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Verification code has been resent to your email");
    }, 1000);
  };

  useEffect(()=>{
    console.log('params.id', params.id)
    console.log('params.verification_token', params.verification_token)
  }, [])

  return (
    <div className="min-h-screen mt-[12vh] bg-gradient-to-br from-green-50 via-white to-purple-50">
      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Check Your Email
              </h1>
              <p className="text-gray-600">We sent a verification code to</p>
              <p className="font-medium text-gray-900 mt-1">{email}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
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
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
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
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                  >
                    Resend
                  </button>
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="w-full flex items-center justify-center space-x-2 mt-4 py-3 text-gray-600 hover:text-gray-900 font-medium transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Change Email</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">💡 Tip:</span> Check your spam
                  folder if you don't see the email in your inbox.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerifyCodePage;


export const registerSuccessExample = {
  success: true,
  message: "OTP sent successfully",
};


export const verifyOtpSuccessExample = {
  success: true,

  message: "Account verified successfully",

  data: {
    user: {
      _id: "68751c9b4d8dcb2b",

      name: "Yousef",

      email: "admin@falcon.com",

      phone: "0999999999",

      role: "customer",

      isVerified: true,
    },

    accessToken: "access_token_here",

    refreshToken: "refresh_token_here",
  },
};


export const loginSuccessExample = {
  success: true,

  message: "Login successful",

  data: {
    user: {
      _id: "68751c9b4d8dcb2b",

      name: "Admin",

      email: "admin@falcon.com",

      phone: "0999999999",

      role: "admin",

      isVerified: true,
    },

    accessToken: "access_token_here",

    refreshToken: "refresh_token_here",
  },
};


export const logoutSuccessExample = {
  success: true,

  message: "Logged out successfully",
};


export const forgotPasswordExample = {
  success: true,

  message: "OTP sent successfully",
};


export const resetPasswordExample = {
  success: true,

  message: "Password reset successfully",
};
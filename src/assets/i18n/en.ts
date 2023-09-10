const common = {
  menu_user: 'User',
  menu_session: 'Session',
  menu_profile: 'Profile',
  menu_logout: 'Logout',
  loading_msg: 'Loading, please wait...',
  no_data: 'No Data',
  password_length: 'At least 8 characters',
  password_combo: 'At least 3 of the following:',
  password_lowercase: 'Lower case letters (a-z)',
  password_uppercase: 'Upper case letters (A-Z)',
  password_number: 'Numbers (0-9)',
  password_special_char: 'Special characters (e.g. !@#$%^&*)',
  search: 'Search',
  save: 'Save',
  update_success: 'Update successfully',
  update_fail: 'Update failed',
  validate_required: '{field} is required',
  validate_invalid: '{field} is invalid',
  validate_not_match: 'Passwords do not match',
  validate_alphabetic: '{field} should not contain number or special character',
};

const login = {
  login: 'Login',
  logout: 'Logout',
  sign_up: 'Sign Up',
  copyright: '© 2023 K-H Li. All rights reserved.',
  welcome: 'Welcome',
  email_verification: 'Email Verification',
  email_verification_para1: 'We\'ve sent an email to { field }. Please click on the link to complete the verification process.',
  email_verification_para2: 'In case you may enter incorrect email, You could re-enter a new one and try again.',
};

const user = {
  stats_total: 'Total Users',
  stats_today: 'Active Session Users (Today)',
  stats_7days: 'Avg. Active Session Users (Last 7 Days)',
  stats_total_tooltip: 'Total number of users who have signed up',
  stats_today_tooltip: 'Total number of users with active sessions today',
  stats_7days_tooltip: 'Average number of active session users in the last 7 days rolling',
  user_list: 'User List',
  user_name: 'Name',
  user_given_name: 'Given Name',
  user_family_name: 'Family Name',
  user_email: 'Email',
  user_login_count: 'Login Count',
  user_last_login: 'Last Session Time',
  user_signup_time: 'Sign Up TIme',
};

const profile = {
  change_email_title: 'Change Email',
  change_email_content: 'Email has been changed, you will be required to re-login with {email}',
  change_email_fail: 'Change email failed',
  change_pwd_title: 'Change Password',
  change_pwd_content: 'Your password has been changed successfully. Please use your new password to log in.',
  change_pwd_fail: 'Change password failed',
  delete_account_title: 'Delete Account',
  delete_account_content1: 'This action cannot be undone and will permanently delete your account.',
  delete_account_content2: 'Are you sure you want to delete your account permanently?',
  delete_account_fail: 'Delete account failed',
  user_profile: 'User Profile',
  user_profile_old_password: 'Old Password',
  user_profile_new_password: 'New Password',
  user_profile_confirm_password: 'Re-Enter New Password',
};

export default {
  ...common,
  ...login,
  ...user,
  ...profile,
};

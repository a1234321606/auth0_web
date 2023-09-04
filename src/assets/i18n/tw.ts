const common = {
  menu_user: '用戶',
  menu_session: '會話',
  menu_profile: '個人檔案',
  menu_logout: '登出',
  loading_msg: '載入中，請稍候...',
  no_data: '無資料',
  password_length: '至少八字元',
  password_combo: '包含至少以下三項:',
  password_lowercase: '小寫字母 (a-z)',
  password_uppercase: '大寫字母 (A-Z)',
  password_number: '數字 (0-9)',
  password_special_char: '特殊字元 (即 !@#$%^&*)',
  search: '搜尋',
  save: '儲存',
  update_success: '更新成功',
  update_fail: '更新失敗',
  validate_required: '{field} 為必填',
  validate_invalid: '無效的 {field}',
  validate_not_match: '兩次密碼不相同',
};

const login = {
  login: '登入',
  logout: '登出',
  sign_up: '註冊',
  copyright: '© 2023 K-H Li 版權所有',
  welcome: '歡迎',
};

const user = {
  stats_total: '用戶總數',
  stats_today: '今日用戶活躍數',
  stats_7days: '平均7日用戶活躍數',
  stats_total_tooltip: '已註冊用戶總數',
  stats_today_tooltip: '今日已活躍之用戶數',
  stats_7days_tooltip: '過去7日平均之活躍用戶數',
  user_list: '用戶列表',
  user_name: '名稱',
  user_given_name: '名',
  user_family_name: '姓',
  user_email: '電子信箱',
  user_login_count: '登入次數',
  user_last_login: '最後登入時間',
  user_signup_time: '註冊時間',
};

const profile = {
  change_email_title: '變更電子信箱',
  change_email_content: '電子信箱已變更，請使用新的電子信箱 {email} 重新登入',
  change_email_fail: '變更電子信箱失敗',
  change_pwd_title: '變更密碼',
  change_pwd_content: '您的密碼已成功變更，請使用新密碼重新登入',
  change_pwd_fail: '變更密碼失敗',
  delete_account_title: '刪除帳號',
  delete_account_content1: '此動作不能回復且將永久刪除您的帳號',
  delete_account_content2: '您確定要永久刪除您的帳號嗎?',
  delete_account_fail: '刪除帳號失敗',
  user_profile: '使用者資料',
  user_profile_old_pwd: '舊密碼',
  user_profile_new_pwd: '新密碼',
  user_profile_confirm_pwd: '重新輸入新密碼',
};

export default {
  ...common,
  ...login,
  ...user,
  ...profile,
};

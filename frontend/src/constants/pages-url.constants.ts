export const WELCOME_PAGE = "/welcome";

export const AUTH_BASE = "/auth";
export const LOGIN_PAGE = `${ AUTH_BASE }/login`;
export const REGISTER_PAGE = `${ AUTH_BASE }/register`;
export const LOGOUT_PAGE = `${ AUTH_BASE }/logout`;

export const PROFILE_PAGE = "/profile";
export const DASHBOARD_PAGE = "/board";
export const COURSES_PAGE = "/courses";

export const NEED_AUTH_PAGES = [ LOGOUT_PAGE, PROFILE_PAGE, DASHBOARD_PAGE, COURSES_PAGE ];

// Routes and Roles guard
export const routeRoles: {[key: string]: string[]} = {
    '/majors': ['Student', 'Admin'],
    '/groups': ['Student', 'Admin']
};
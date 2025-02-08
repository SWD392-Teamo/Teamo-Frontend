export function isRouteAllowed(
    pathname: string,
    userRole: string,
    routeRoles: { [key: string]: string[] }
  ): boolean {
    // Check if the current path starts with any of the route prefixes
    const allowedRoute = Object.keys(routeRoles).find((routePrefix) =>
      pathname.startsWith(routePrefix)
    );
  
    if (allowedRoute) {
      // Get the allowed roles for the matched route
      const allowedRoles = routeRoles[allowedRoute];
      return allowedRoles.includes(userRole);
    }
  
    // If no route matches, allow access by default (or you can deny access if needed)
    return true;
  }
import { createMiddleware } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

export const requireAuth = createMiddleware().server(
  async ({ next }) => {
    const userId = getCookie("admin_session");

    if (!userId) {
      throw new Error('Unauthorized: Administrator access is required');
    }

    return next({
      context: {
        userId,
      },
    });
  },
);

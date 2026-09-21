import type { RouteObject } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import NotFoundPage from '@/pages/NotFoundPage'
import RouteErrorPage from '@/pages/RouteErrorPage'
import UserLayout from '@/layouts/UserLayout'
import UserTablePage from '@/pages/UserTablePage'
import AddUserPage from '@/pages/AddUserPage'

/**
 * Route table kept separate from the router instance so tests can mount it
 * with createMemoryRouter.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "users", element: <UserLayout />,
        children: [
          { index: true, element: <UserTablePage /> },
          { path: 'add', element: <AddUserPage /> },
          { path: ':id/edit', element: <AddUserPage /> }


        ]

      },

      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './modules/layout/root';
import CogsPage from './modules/cogs';
import HomePage from './modules/home';
import LoginPage from './modules/login';
import MagicLinkPage from './modules/magic-link';

const Router = () => {
	const router = createBrowserRouter([
		{
			id: 'root',
			path: '/',
			element: <RootLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: 'login',
					element: <LoginPage />,
				},
				{
					path: 'magic-link/:id',
					element: <MagicLinkPage />,
				},
				{
					path: 'cogs',
					element: <CogsPage />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
};
export default Router;

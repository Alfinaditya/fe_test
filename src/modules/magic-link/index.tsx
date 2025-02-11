import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Card,
	CardContent,
} from '@mui/material';
import Cookies from 'js-cookie';

const MagicLinkPage = () => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [messageConfig, setMessageConfig] = useState<{
		isShow: boolean;
		status: 'success' | 'error';
		message: string;
	}>({ isShow: false, status: 'success', message: '' });

	useEffect(() => {
		if (id) {
			validateToken(id);
		}
	}, [id]);

	const validateToken = (token: string) => {
		try {
			const MagicLinkSchema = z.object({
				token: z
					.string({ message: 'Token must be string' })
					.uuid({ message: 'Token is invalid' }),
			});
			MagicLinkSchema.parse({ token: token });
			const currToken = Cookies.get('token');
			if (!currToken) {
				const randomToken = id as string;
				Cookies.set('token', randomToken);
				setMessageConfig({
					isShow: true,
					message: `Authentication Successful!, Your Token is ${randomToken}`,
					status: 'success',
				});
				return;
			}
			setMessageConfig({
				isShow: true,
				message: `Authentication Successful! Your Token is ${currToken}`,
				status: 'success',
			});
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				setMessageConfig({
					isShow: true,
					message: error.issues[0].message,
					status: 'error',
				});
			}
		}
	};
	const handleLogout = () => {
		Cookies.remove('token');
		navigate('/login');
	};
	return (
		<div>
			{messageConfig.isShow && (
				<Card variant="outlined" style={{ padding: 10 }}>
					<CardContent>
						<Alert
							data-testid="magic-link-alert"
							severity={messageConfig.status}
						>
							<AlertTitle
								data-testid="magic-link-alert-title"
								style={{ textTransform: 'capitalize' }}
							>
								{messageConfig.status}
							</AlertTitle>
							{messageConfig.message}
						</Alert>
					</CardContent>
					{messageConfig.status === 'success' && (
						<Box textAlign={'center'}>
							<Button onClick={handleLogout} variant="contained">
								Logout
							</Button>
						</Box>
					)}
				</Card>
			)}
		</div>
	);
};

export default MagicLinkPage;

import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	Paper,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { z } from 'zod';

const MagicLinkSchema = z.object({
	email: z
		.string({ message: 'Email must be string' })
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email is not valid' }),
});
type MagicLinkInput = z.infer<typeof MagicLinkSchema>;

const LoginPage = () => {
	const navigate = useNavigate();
	const [magicLink, setMagicLink] = useState('');
	const token = Cookies.get('token');
	const form = useForm<MagicLinkInput>({
		resolver: zodResolver(MagicLinkSchema),
		defaultValues: {
			email: '',
		},
	});

	if (token) {
		return <Navigate to={`/magic-link/${token}`} />;
	}

	const onSubmit = () => {
		const host = window.location.protocol + '//' + window.location.host;
		setMagicLink('');
		form.reset();
		setMagicLink(`${host}/magic-link/${crypto.randomUUID()}`);
	};
	return (
		<>
			<Button onClick={() => navigate('/')} size="small" sx={{ mb: 2 }}>
				<ArrowBackIcon />
				Back
			</Button>
			<Card variant="outlined">
				<CardContent>
					<Typography sx={{ mb: 3.5 }} variant="h2" textAlign={'center'}>
						Magic Link
					</Typography>

					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Box sx={{ mb: 3.5 }}>
							<Controller
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormControl fullWidth>
										<TextField
											error={!!form.formState.errors.email}
											type="email"
											label="Email"
											helperText={
												form.formState.errors.email
													? form.formState.errors.email.message
													: null
											}
											variant="outlined"
											{...field}
										/>
									</FormControl>
								)}
							/>
						</Box>
						{magicLink && (
							<Paper
								data-testid="magic-link-card"
								sx={{ height: '100px', mb: 3.5 }}
								className="copy-box"
							>
								<Box sx={{ p: '20px' }}>
									<Link data-testid="magic-link-href" to={magicLink}>
										{magicLink}
									</Link>
								</Box>
								<Tooltip title="Copy to clipboard">
									<Button
										onClick={async () =>
											await navigator.clipboard.writeText(magicLink)
										}
										sx={{ minWidth: '30px' }}
									>
										<ContentCopyIcon
											sx={{ height: '20px', color: '#216C17' }}
										/>
									</Button>
								</Tooltip>
							</Paper>
						)}
						<Button type="submit" variant="contained" fullWidth>
							Login
						</Button>
					</form>
				</CardContent>
			</Card>
		</>
	);
};

export default LoginPage;

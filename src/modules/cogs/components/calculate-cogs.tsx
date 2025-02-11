import { Box, DialogContent, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import { ModalProps } from '../../../types/modal';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toRupiahFormat } from '../../../lib/utils';

const CalcCogsSchema = z.object({
	cups: z.coerce
		.number({ message: 'Cups must be number' })
		.positive({ message: 'Cups cannot be less or equal than 0' }),
});
type CalcCogsInput = z.infer<typeof CalcCogsSchema>;

const BASE_INVENTORIES = [
	{ name: 'Aren Sugar', quantity: 15, unit: 'g', price: 60_000 },
	{ name: 'Milk', quantity: 150, unit: 'ml', price: 30_000 },
	{ name: 'Ice Cube', quantity: 20, unit: 'g', price: 15_000 },
	{ name: 'Plastic Cup', quantity: 1, unit: 'pcs', price: 5_000 },
	{ name: 'Coffee Bean', quantity: 20, unit: 'g', price: 100_000 },
	{ name: 'Mineral Water', quantity: 50, unit: 'ml', price: 5_000 },
] as Array<{
	name: string;
	quantity: number;
	unit: 'g' | 'pcs' | 'ml';
	price: number;
}>;

const CalculateCogsModal: React.FC<ModalProps> = ({ open, handleClose }) => {
	const [totalCost, setTotalCost] = useState(0);

	const form = useForm<CalcCogsInput>({
		resolver: zodResolver(CalcCogsSchema),
		defaultValues: {
			cups: 0,
		},
		mode: 'onChange',
	});
	const totalCups = Number(form.watch('cups'));

	useEffect(() => {
		if (totalCups > 0) {
			calculateCogs();
		}
	}, [totalCups]);

	const calculateCogs = () => {
		let total = 0;
		BASE_INVENTORIES.map((item) => {
			let cost = 0;
			switch (item.unit) {
				case 'g':
					cost = (item.quantity * totalCups * item.price) / 1000;
					break;
				case 'ml':
					cost = (item.quantity * totalCups * item.price) / 1000;
					break;
				case 'pcs':
					cost = (item.quantity * totalCups * item.price) / 10;
					break;

				default:
					break;
			}
			total += cost;
		});

		setTotalCost(total);
	};
	return (
		<Dialog
			open={open}
			style={{ padding: 10 }}
			sx={{ padding: 10 }}
			onClose={handleClose}
			maxWidth="xs"
			fullWidth
			data-testid="calculate-cogs-modal"
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Calculate COGS for Iced Coffee
			</DialogTitle>
			<DialogContent>
				<ul style={{ marginBottom: 40 }}>
					{BASE_INVENTORIES.map((inventory, i) => (
						<li key={i}>
							{inventory.quantity} {inventory.unit} of {inventory.name}
						</li>
					))}
				</ul>

				<Box textAlign="center" margin="auto" sx={{ width: '90%' }}>
					<Box sx={{ mb: 3.5 }}>
						<Controller
							control={form.control}
							name="cups"
							render={({ field }) => (
								<FormControl fullWidth>
									<TextField
										fullWidth
										label="Cups"
										type="number"
										error={!!form.formState.errors.cups}
										helperText={
											form.formState.errors.cups
												? form.formState.errors.cups.message
												: null
										}
										variant="outlined"
										{...field}
									/>
								</FormControl>
							)}
						/>
					</Box>
					<Box sx={{ mb: 3.5 }}>
						<FormControl fullWidth>
							<TextField
								fullWidth
								label="Total COGS"
								variant="outlined"
								disabled={true}
								name="totalCogs"
								onChange={() => {}}
								value={toRupiahFormat(totalCost)}
							/>
						</FormControl>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default CalculateCogsModal;

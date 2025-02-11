import { ModalProps as BaseModalProps } from '@mui/material';

export interface ModalProps {
	open: boolean;
	handleClose: () => void;
}

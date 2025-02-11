import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import InventoryIcon from '@mui/icons-material/Inventory';

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<MenuList>
			<MenuItem onClick={() => navigate('/login')}>
				<ListItemIcon>
					<AutoFixHighIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Magic Link</ListItemText>
			</MenuItem>
			<MenuItem onClick={() => navigate('/cogs')}>
				<ListItemIcon>
					<InventoryIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>Inventory</ListItemText>
			</MenuItem>
		</MenuList>
	);
};

export default HomePage;

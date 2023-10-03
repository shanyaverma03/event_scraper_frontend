import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { FilterContext } from '../EventsTable';

export default function WebsiteNameFilter() {
	const { filters, setFilters } = useContext(FilterContext);

	const handleToggle = value => () => {
		setFilters(prevFilters => {
			const websiteNames = prevFilters['Website Name'].tempValue;

			const currentIndex = websiteNames.indexOf(value);
			const newType = [...websiteNames];

			if (currentIndex === -1) {
				newType.push(value);
			} else {
				newType.splice(currentIndex, 1);
			}

			return {
				...prevFilters,
				'Website Name': {
					...prevFilters['Website Name'],
					tempValue: newType,
				},
			};
		});
	};

	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			{[
				'Tech event calendar 2022: Upcoming US shows, conferences, and IT expos | Computerworld',
				'All Tech Events - Techmeme',
			].map(value => {
				const labelId = `website-name-label-${value}`;

				return (
					<ListItem key={value} disablePadding>
						<ListItemButton role={undefined} onClick={handleToggle(value)} dense>
							<ListItemIcon>
								<Checkbox
									edge='start'
									checked={
										filters['Website Name'].tempValue.indexOf(value) !== -1
									}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
}

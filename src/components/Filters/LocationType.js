import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { FilterContext } from '../EventsTable';

export default function LocationType() {
	const { filters, setFilters } = useContext(FilterContext);

	const handleToggle = value => () => {
		setFilters(prevFilters => {
			const locationTypes = prevFilters['Location Type'].tempValue;

			const currentIndex = locationTypes.indexOf(value);
			const newType = [...locationTypes];

			if (currentIndex === -1) {
				newType.push(value);
			} else {
				newType.splice(currentIndex, 1);
			}

			return {
				...prevFilters,
				'Location Type': {
					...prevFilters['Location Type'],
					tempValue: newType,
				},
			};
		});
	};

	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			{['Virtual', 'Offline'].map(value => {
				const labelId = `location-type-label-${value}`;

				return (
					<ListItem key={value} disablePadding>
						<ListItemButton role={undefined} onClick={handleToggle(value)} dense>
							<ListItemIcon>
								<Checkbox
									edge='start'
									checked={
										filters['Location Type'].tempValue.indexOf(value) !== -1
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

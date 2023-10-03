import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import LocationType from './LocationType';
import DateFilter from './DateFilter';
import WebsiteNameFilter from './WebsiteNameFilter';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`filter-tabpanel-${index}`}
			aria-labelledby={`filter-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `filter-tab-${index}`,
		'aria-controls': `filter-tabpanel-${index}`,
	};
}

export default function FilterTabs() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
			<Tabs
				orientation='vertical'
				value={value}
				onChange={handleChange}
				aria-label='Filter tabs'
				sx={{ borderRight: 1, borderColor: 'divider' }}
			>
				<Tab label='Location Type' {...a11yProps(0)} />
				<Tab label='Date' {...a11yProps(1)} />
				<Tab label='Website Name' {...a11yProps(2)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<LocationType />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<DateFilter />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<WebsiteNameFilter />
			</TabPanel>
		</Box>
	);
}

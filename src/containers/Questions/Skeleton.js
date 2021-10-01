import React from 'react';
import { Box, SkeletonCircle, SkeletonText } from '@material-ui/core';

const LoadingSkelton = ({ count = 3 }) => {
	return (
		<div>
			<Box padding='6' boxShadow='lg' bg='white'>
				{[...Array(count)].map((x, i) => (
					<div key={i} m={4}>
						<SkeletonCircle size='10' />
						<SkeletonText mt='4' noOfLines={4} spacing='4' mb='4' />
					</div>
				))}
			</Box>
		</div>
	);
};

export default LoadingSkelton;
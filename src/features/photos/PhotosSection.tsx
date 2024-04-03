import { Box, Typography, ImageList, ImageListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import usePhotosStyle from './PhotosSection.style';
import { useEffect, useState } from 'react';

const DashboardSection = () => {
    const { classes } = usePhotosStyle();
    const { t } = useTranslation();

		const [photos, setPhotos] = useState([]);

		useEffect(() => {
				const getPhotos = async () => {
						const response = await fetch('https://jsonplaceholder.typicode.com/photos');
						const data = await response.json();
						setPhotos(data);
				}
				getPhotos();
		}, [])

    return (
        <Box className={classes.container}>
            <>
                <Typography paddingBottom={4} variant="h3" color="secondary">
									{t('titles.photos')}
                </Typography>
								<ImageList sx={{ width: '100%', height: '100%' }} cols={6}>
									{photos.map((item) => (
										<ImageListItem key={item.url}>
											<img
												srcSet={`${item.url}`}
												src={`${item.url}`}
												alt={item.title}
												loading="lazy"
											/>
										</ImageListItem>
									))}
								</ImageList>
            </>
        </Box>
    );
};

export default DashboardSection;

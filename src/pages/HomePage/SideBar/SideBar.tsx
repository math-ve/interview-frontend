// import { usePermission } from '@hooks/usePermission';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { List, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router-dom';
import useSideBarStyle from './SideBar.style';

function SideBar() {
    const { classes } = useSideBarStyle();
    const { t } = useTranslation();
    // const { canManageTeam } = usePermission();
    const navigate = useNavigate();

    return (
        <List aria-label="main folders" className={classes.list} component="nav">
            <ListItem
                className={`${classes.navLink} ${useMatch('/') && classes.navLinkActive}`}
                component="span"
                button
                onClick={() => navigate('/')}
            >
                <ListItemIcon>
                    <SvgIcon className={classes.listItemIcon} component={DashboardOutlinedIcon} viewBox="0 0 24 24" />
                </ListItemIcon>
                <div className={classes.nameContainer}>
                    <ListItemText
                        primary={t('titles.overview')}
                        primaryTypographyProps={{ className: classes.listItemText }}
                    />
                </div>
            </ListItem>
            <ListItem
                className={`${classes.navLink} ${useMatch('/photos') && classes.navLinkActive}`}
                component="span"
                button
                onClick={() => navigate('/photos')}
            >
                <ListItemIcon>
                    <SvgIcon className={classes.listItemIcon} component={InsertPhotoOutlinedIcon} viewBox="0 0 24 24" />
                </ListItemIcon>
                <div className={classes.nameContainer}>
                    <ListItemText
                        primary={t('titles.photos')}
                        primaryTypographyProps={{ className: classes.listItemText }}
                    />
                </div>
            </ListItem>
        </List>
    );
}

export default SideBar;

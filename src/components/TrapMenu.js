import RoomIcon from '@material-ui/icons/Room';
import { markTrap, unMarkTrap } from 'services/marker-service';
const { List, ListItem, ListItemIcon, ListItemText } = require('@material-ui/core');
const { BottomSheet } = require('react-spring-bottom-sheet');

const TrapMenu = ({ trap, show, setShow, reloadTraps }) => {
    const { name, id } = trap ?? {};

    const onDismiss = () => {
        setShow(false);
    };

    const onMarkTrap = async () => {
        await markTrap(id);
        await reloadTraps();
        setShow(false);
    };

    const onUnMarkTrap = async () => {
        await unMarkTrap(id);
        await reloadTraps();
        setShow(false);
    };

    return (
        <BottomSheet
            open={show}
            onDismiss={onDismiss}
            defaultSnap={({ snapPoints, lastSnap }) => lastSnap ?? Math.min(...snapPoints)}
            snapPoints={({ maxHeight }) => [maxHeight - maxHeight / 2, maxHeight * 0.3]}
            header={<div className="font-bold text-lg">{name ?? ''}</div>}
        >
            <div>
                <List>
                    {trap?.state === 'standby' && (
                        <ListItem button onClick={onMarkTrap}>
                            <ListItemIcon>
                                <RoomIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mark on map" />
                        </ListItem>
                    )}
                    {trap?.state === 'deployed' && (
                        <ListItem button onClick={onUnMarkTrap}>
                            <ListItemIcon>
                                <RoomIcon />
                            </ListItemIcon>
                            <ListItemText primary="Unmark trap" />
                        </ListItem>
                    )}
                </List>
            </div>
        </BottomSheet>
    );
};

export default TrapMenu;

import RoomIcon from '@material-ui/icons/Room';
const { List, ListItem, ListItemIcon, ListItemText } = require('@material-ui/core');
const { BottomSheet } = require('react-spring-bottom-sheet');

const TrapMenu = ({ trap, show, setShow }) => {
    const onDismiss = () => {
        setShow(false);
    };

    return (
        <BottomSheet
            open={show}
            onDismiss={onDismiss}
            defaultSnap={({ snapPoints, lastSnap }) => lastSnap ?? Math.min(...snapPoints)}
            snapPoints={({ maxHeight }) => [maxHeight - maxHeight / 2, maxHeight * 0.3]}
            header={<div className="font-bold text-lg">Test</div>}
        >
            <div>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <RoomIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mark on map" />
                    </ListItem>
                </List>
            </div>
        </BottomSheet>
    );
};

export default TrapMenu;

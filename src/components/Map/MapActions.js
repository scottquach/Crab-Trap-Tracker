import { ExploreOffTwoTone, MapTwoTone } from '@material-ui/icons';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import useTrapsModifier from '../../hooks/useTrapsModifier';

const MapActions = ({ trap, show, setShow, traps, setTraps }) => {
    const { unmarkFromMap } = useTrapsModifier(traps, setTraps);

    const onDismiss = () => {
        setShow(false);
    };

    const handleUnmarkFromMap = () => {
        unmarkFromMap(trap.id);
        onDismiss();
    };

    return (
        <BottomSheet className="" open={show} onDismiss={onDismiss} header={<h3>{trap ? trap.name : ''}</h3>} blocking={true}>
            <div className="">
                {trap?.state === 'active' && (
                    <div className="flex m-4" onClick={handleUnmarkFromMap}>
                        <ExploreOffTwoTone className="mr-2"></ExploreOffTwoTone>
                        <div className="font-medium">Unmark from Map</div>
                    </div>
                )}
                <div className="flex m-4">
                    <MapTwoTone className="mr-2"></MapTwoTone>
                    <div className="font-medium">Navigate to Trap</div>
                </div>
            </div>
        </BottomSheet>
    );
};

export default MapActions;

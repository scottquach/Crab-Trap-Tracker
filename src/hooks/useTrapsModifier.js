import { saveTraps } from '../services/db-service';
import { getCurrentLocation } from '../services/location-service';

const useTrapsModifier = (traps, setTraps) => {
    // const [traps, setTraps] = useState([]);

    const markOnMap = (id) => {
        getCurrentLocation()
            .then((position) => {
                console.log(position);
                const index = traps.findIndex((trap) => trap.id === id);
                traps[index].state = 'active';
                traps[index].location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setTraps(traps.slice());
                saveTraps(traps.slice());
            })
            .catch((err) => console.error(err));
    };

    const unmarkFromMap = (id) => {
        const index = traps.findIndex((trap) => trap.id === id);
        traps[index].state = 'inactive';
        traps[index].location = null;
        setTraps(traps.slice());
        saveTraps(traps.slice());
    };

    const deleteTrap = (id) => {
        const index = traps.findIndex((trap) => trap.id === id);
        traps.splice(index, 1);
        setTraps(traps.slice());
        saveTraps(traps.slice());
    };

    return {
        traps,
        setTraps,
        markOnMap,
        unmarkFromMap,
        deleteTrap,
    };
};

export default useTrapsModifier;

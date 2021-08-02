import Trap from './Trap';
import db from 'services/db-service';
import { useEffect, useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import CreateTrapForm from './Traps/CreateTrapForm';

const TrapsView = () => {
    const [traps, setTraps] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const loadTraps = async () => {
        const loadedTraps = await db.traps.toArray();
        console.log(loadedTraps);
        setTraps(loadedTraps);
    };

    useEffect(() => {
        loadTraps();
    }, []);

    return (
        <div className="p-4 h-full flex-1">
            <div className="text-left text-2xl font-bold">My Traps</div>
            <div>
                {traps.map((trap) => (
                    <Trap key={trap.id} data={trap}></Trap>
                ))}
            </div>
            <Button className="mt-8" variant="outlined" startIcon={<AddIcon />} onClick={() => setShowCreateForm(true)}>
                Create trap
            </Button>
            <CreateTrapForm show={showCreateForm} setShow={setShowCreateForm} reloadTraps={loadTraps}></CreateTrapForm>
        </div>
    );
};

export default TrapsView;

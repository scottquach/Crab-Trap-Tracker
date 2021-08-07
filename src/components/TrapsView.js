import Trap from './Trap';
import db from 'services/db-service';
import { useEffect, useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import TrapCreateForm from './TrapCreateForm';
import TrapMenu from './TrapMenu';

const TrapsView = () => {
    const [traps, setTraps] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [focusTrap, setFocusTrap] = useState(null);

    const loadTraps = async () => {
        const loadedTraps = await db.traps.toArray();
        console.log(loadedTraps);
        setTraps(loadedTraps);
    };

    useEffect(() => {
        loadTraps();
    }, []);

    const onTrapSelected = (trap) => {
        setFocusTrap(trap);
        setShowMenu(true);
    };

    return (
        <div className="p-4 h-full flex-1">
            <div className="text-left text-2xl font-bold">My Traps</div>
            {traps.map((trap) => (
                <div onClick={() => onTrapSelected(trap)} key={trap.id}>
                    <Trap data={trap}></Trap>
                </div>
            ))}
            <Button className="mt-8" variant="outlined" startIcon={<AddIcon />} onClick={() => setShowCreateForm(true)}>
                Create trap
            </Button>
            <TrapCreateForm show={showCreateForm} setShow={setShowCreateForm} reloadTraps={loadTraps}></TrapCreateForm>
            <TrapMenu show={showMenu} setShow={setShowMenu} trap={focusTrap}></TrapMenu>
        </div>
    );
};

export default TrapsView;

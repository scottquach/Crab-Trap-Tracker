import { Button, TextField } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import Trap from 'models/TrapModel';
import db from 'services/db-service';
import { BottomSheet } from 'react-spring-bottom-sheet';

const TrapCreateForm = ({ show, setShow, reloadTraps }) => {
    // console.log(showProp);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [valid, setValid] = useState(false);
    // const [show, setShow] = useState(false);

    useEffect(() => {
        if (name && description) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [name, description]);

    const createTrap = () => {
        console.log(name, description);
        const trap = new Trap(name, description);

        trap.save().then(console.log).catch(console.error);

        db.traps.toArray().then(console.log).catch(console.error);
        reloadTraps();
        onDismiss();
    }

    function onDismiss() {
        setShow(false);
    }

    return (
        <BottomSheet
            open={show}
            onDismiss={onDismiss}
            defaultSnap={({ snapPoints, lastSnap }) => lastSnap ?? Math.min(...snapPoints)}
            snapPoints={({ maxHeight }) => [maxHeight - maxHeight / 5, maxHeight * 0.6]}
            header={<div className="font-bold text-lg">Create a Trap</div>}
            footer={
                <Button className="w-full" variant="outlined" disabled={!valid} onClick={createTrap}>
                    Create
                </Button>
            }
        >
            <div className="flex flex-col items-center p-4">
                <div>Will be used to log and track individual traps</div>
                <TextField
                    className="mt-8 w-full"
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    variant="filled"
                ></TextField>
                <TextField
                    className="mt-4 w-full"
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    variant="filled"
                ></TextField>
            </div>
        </BottomSheet>
    );
};

export default TrapCreateForm;

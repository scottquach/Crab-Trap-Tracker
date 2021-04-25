import { Button, TextField } from '@material-ui/core';
import './CreateTrapForm.css';
import '../App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router';
import { saveTraps } from '../services/db-service';

const CreateTrapForm = ({ traps, setTraps }) => {
    const [trapName, setTrapName] = useState('');
    // const addTrap = useStoreActions((actions) => actions.addTrap);
    const history = useHistory();
    // console.log(traps);

    function createTrap() {
        const trap = {
            name: trapName,
            state: 'inactive',
            id: uuidv4(),
        };
        traps.push(trap);
        setTraps(traps);
        saveTraps(traps).then(
            () => {
                history.push('/traps');
            },
            (error) => {
                console.error(error);
            }
        );
    }

    return (
        <div className="flex flex-col w-full h-full flex-1">
            <h3 className="text-left w-full">Create Trap</h3>
            <div className="text-left opacity-80 mb-8">Will be used to track individual traps</div>
            <TextField
                label="Trap Name"
                value={trapName}
                onChange={(event) => setTrapName(event.target.value)}
                variant="filled"
            ></TextField>
            <div className="form__image">Image</div>
            <Button classes="mt-auto mb-8" onClick={createTrap} variant="contained" color="primary" disableElevation>
                Create
            </Button>
        </div>
    );
};

export default CreateTrapForm;

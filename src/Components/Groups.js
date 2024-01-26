import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Typography } from '@mui/material';

const GroupSelect = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3003/groups')
            .then(response => {
                console.log(response.data)
                const groupOptions = response.data.chats.map(group => ({
                    value: group.id.user,
                    label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <img src={group.image} alt={group.name} style={{ width: '20px', height: '20px', marginRight: '10px' }} /> */}
                            {group.name}
                        </div>
                    )
                }));
                setGroups(groupOptions);
            })
            .catch(error => console.error('Error fetching groups:', error));
    }, []);

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            color: state.isSelected ? 'white' : 'black',
            backgroundColor: state.isSelected ? 'blue' : 'white',
        }),
        // Estilos para o container do Select
        container: (provided, state) => ({
            ...provided,
            margin: '20px', // Ajuste o valor da margem conforme necessário
        }),
    };

    return <>
        <Typography className={{ padding: "16px 0", }} variant="h5">
            Grupo
        </Typography>
        <Select options={groups} styles={customStyles} />;
    </>
};

export default GroupSelect;

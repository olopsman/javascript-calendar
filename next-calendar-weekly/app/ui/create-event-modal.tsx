
import React from 'react'
import BaseDialog from './primary-dialog'
import { Container, DialogTitle } from '@mui/material'
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

export default function CreateEventModal({open, handleClose}: {open: boolean, handleClose: () => void}) {


    return (
    <BaseDialog open={open} title="Create Event" handleClose={handleClose}>
        <Container 
        className='bg-white top-20 left-10 pb-10'>

        </Container>
        
    </BaseDialog>
  )
}

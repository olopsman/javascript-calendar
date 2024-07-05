import React from 'react'
import { Dialog, DialogContent,  DialogTitle, IconButton } from '@mui/material'
import { MdClose } from "react-icons/md";

export default function BaseDialog({open, handleClose, title, children}: {open: boolean, handleClose: () => void, title:string, children?: React.ReactNode}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} scroll="paper" className='rounded'>
        <IconButton onClick={() => handleClose()} className='absolute top-15 right-0'>
            <MdClose />
        </IconButton> 
          {title && <DialogTitle className='font-semibold text-xl'>{title}</DialogTitle>}
          <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  )
}

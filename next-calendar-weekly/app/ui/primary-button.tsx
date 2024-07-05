import React from 'react'
import { Button, styled } from '@mui/material'

const StyledButton = styled(Button)({
    textTransform: "initial",
    borderColor: "white",
    borderRadius: "50px",
    color: "white",
    paddingRight: "24px",
    paddingLeft: "24px",
    height: "48px",
    background: " #07617D",
    "&:hover": {
    background: " #07617D",
  },
});

export default function PrimaryButton() {
  return (
    <div>
      <StyledButton variant="contained" color="primary">
            Hello World
        </StyledButton>
    </div>
  )
}

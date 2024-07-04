import { createTheme } from "@mui/material"

export default function theme() {
  return createTheme({
        typography: {
            fontFamily: "Montserrat, sans-serif",
        },
        palette: {
            primary: {
                main: "#07617D",
                dark: "#07617D",
            },
        },
    })
}

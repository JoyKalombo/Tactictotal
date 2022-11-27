import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { orange } from "@mui/material/colors"

var theme = createTheme({
	shape: {
		borderRadius: 0,
	},
	typography: {
		fontSize: 14,
	},
	palette: {
		mode: "dark",
		primary: {
			light: "#202026",
			main: "#1C1D22",
			dark: "#141418",
			contrastText: "#fff",
		},
		secondary: {
			light: orange[400],
			main: orange[600],
			dark: orange[800],
			contrastText: "#000",
		},
	},
})

theme = responsiveFontSizes(theme)

export default theme

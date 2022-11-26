import { Box, Button, Container, Typography } from "@mui/material"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

// create a tic tac toe board
const board = [
	[1, null, null],
	[null, 5, null],
	[null, null, null],
]

export default function Home() {
	return (
		<Container>
			<Box>
				<Typography textAlign={"center"} variant="h1">
					Math Tic Tac Toe
				</Typography>
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
				<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
					{board.map((row, j) => (
						<Box margin={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
							{row.map((col, i) =>
								col ? (
									<Button variant="contained" size="large" sx={{ width: "100px", height: "100px", margin: "4px" }}>
										{col}
									</Button>
								) : (
									<Button variant="outlined" color="primary" sx={{ width: "100px", height: "100px", margin: "4px" }}>
										{col}
									</Button>
								)
							)}
						</Box>
					))}
				</Box>
			</Box>
		</Container>
	)
}

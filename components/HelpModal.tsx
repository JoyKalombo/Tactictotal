import { Button, Modal, Box, Typography } from "@mui/material"
import { useState } from "react"

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
}

export default function BasicModal() {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div>
			<Button color="info" variant="outlined" onClick={handleOpen}>
				Help?
			</Button>
			<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography variant="h4" textAlign={"center"}>
						Welcome to Tactic Total!
					</Typography>
					<br></br>
					<Typography variant="h5" textAlign={"left"}>
						How to play:
					</Typography>

					<Typography textAlign={"left"}>Players take turns placing numbers between 1 and 9 on the board.</Typography>
					<br></br>

					<Typography textAlign={"left"}>Once a number has been used, it cannot be used again.</Typography>
					<br></br>

					<Typography textAlign={"left"}>
						Player 1's objective is to be the first to have three numbers in a row, column, or diagonal that have a sum of 16.
					</Typography>
					<br></br>

					<Typography textAlign={"left"}>Player 2 is trying to make their line of three numbers have a sum of 15.</Typography>
					<br></br>

					<Typography textAlign={"left"}>
						If all numbers have been used and neither of the rows, columns, nor the diagonals have numbers with a sum of 15 or 16,
						then it is a draw.
					</Typography>
					<br></br>

					<Typography textAlign={"left"}>
						{" "}
						If a player places a number in a tile such that two different lines of three are made which results in one having
						numbers that sum to 16 whilst another having numbers that sum to 15 (simultaneously), then it's - again - a draw.
					</Typography>
				</Box>
			</Modal>
		</div>
	)
}

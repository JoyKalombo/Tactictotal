import { Box, Button, Container, Typography } from "@mui/material"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import HelpModal from "../components/HelpModal"
import styles from "../styles/Home.module.css"

export default function Home() {
	const [options, setOptions]: any = useState(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
	const [board, setBoard]: any = useState([
		[null, null, null],
		[null, null, null],
		[null, null, null],
	])
	const [position, setPosition] = useState([0, 0])
	const [showOptions, setShowOptions] = useState(false)
	const pickBox = (j: number, i: number) => {
		setPosition([j, i])
		setShowOptions(true)
	}
	const [result, setResult] = useState("")

	const selectOption = (option: number) => {
		options.delete(option)
		setOptions(new Set(options))
		setShowOptions(false)
		const newBoard: any = [...board]
		newBoard[position[0]][position[1]] = option
		setBoard(newBoard)

		// ALl the possible winning combinations and  makes sure the row is complete
		let a = board[0][0] + board[0][1] + board[0][2]
		if (!(board[0][0] && board[0][1] && board[0][2])) {
			a = 0
		}

		let b = board[1][0] + board[1][1] + board[1][2]
		if (!(board[1][0] && board[1][1] && board[1][2])) {
			b = 0
		}
		let c = board[2][0] + board[2][1] + board[2][2]
		if (!(board[2][0] && board[2][1] && board[2][2])) {
			c = 0
		}

		let d = board[0][0] + board[1][0] + board[2][0]
		if (!(board[0][0] && board[1][0] && board[2][0])) {
			d = 0
		}

		let e = board[0][1] + board[1][1] + board[2][1]
		if (!(board[0][1] && board[1][1] && board[2][1])) {
			e = 0
		}
		let f = board[0][3] + board[1][3] + board[2][3]
		if (!(board[0][3] && board[1][3] && board[2][3])) {
			f = 0
		}

		let g = board[0][0] + board[1][1] + board[2][2]
		if (!(board[0][0] && board[1][1] && board[2][2])) {
			g = 0
		}
		let h = board[0][2] + board[1][1] + board[2][0]
		if (!(board[0][2] && board[1][1] && board[2][0])) {
			h = 0
		}

		//The code below defines how player 1 wins
		const tally = new Set([a, b, c, d, e, f, g, h])

		if (tally.has(16) && !tally.has(15)) {
			setResult("Player 1")
		}

		if (tally.has(15) && !tally.has(16)) {
			setResult("Player 2")
		}
		if (tally.has(15) && tally.has(16)) {
			setResult("Draw")
		}
		if (options.size === 0 && result === "") {
			setResult("Draw")
		}
	}

	const resetGame = () => {
		setOptions(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
		setBoard([
			[null, null, null],
			[null, null, null],
			[null, null, null],
		])
		setPosition([0, 0])
		setShowOptions(false)
		setResult("")
	}

	return (
		<Container>
			<Box display="flex" flexDirection="column" alignItems="space-around" justifyContent="center" sx={{ minHeight: "90vh" }}>
				{result === "" ? (
					options.size > 0 &&
					(showOptions ? (
						<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
							{[...options].map((option) => (
								<Button onClick={() => selectOption(option)} key={option} variant="contained" color="primary" sx={{ m: 1 }}>
									{option}
								</Button>
							))}
						</Box>
					) : options.size % 2 === 0 ? (
						<Typography textAlign={"center"} variant="h2">
							Player 2's turn
						</Typography>
					) : (
						<Typography textAlign={"center"} variant="h2">
							Player 1's Turn
						</Typography>
					))
				) : (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						<Typography textAlign={"center"} variant="h2">
							{result === "Draw" ? "Draw" : `${result} wins`}
						</Typography>
						<Button onClick={resetGame} color="warning" variant="contained" size="large" sx={{ margin: "4px" }}>
							Restart Game
						</Button>
					</Box>
				)}

				<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
					{board.map((row: any, j: any) => (
						<Box key={j} margin={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
							{row.map((col: any, i: any) =>
								col ? (
									<Button
										key={i}
										variant="contained"
										size="large"
										sx={{ width: "100px", height: "100px", margin: "4px", outlineColor: "red", fontSize: "20px" }}>
										{col}
									</Button>
								) : (
									<Button
										key={i}
										onClick={() => pickBox(j, i)}
										variant="outlined"
										color="secondary"
										sx={{ width: "100px", height: "100px", margin: "4px" }}>
										{col}
									</Button>
								)
							)}
						</Box>
					))}
				</Box>
				<Box>
					<HelpModal />
				</Box>
			</Box>
		</Container>
	)
}

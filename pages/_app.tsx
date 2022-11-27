import "../styles/globals.css"
import type { AppProps } from "next/app"
import { useState } from "react"
import { TezosToolkit } from "@taquito/taquito"
import ConnectButton from "../components/ConnectWallet"
import DisconnectButton from "../components/DisconnectWallet"
import qrcode from "qrcode-generator"
import UpdateContract from "../components/UpdateContract"
import Transfers from "../components/Transfers"
import { AppBar, Box, Container, ThemeProvider, Typography } from "@mui/material"
import theme from "../components/theme"

enum BeaconConnection {
	NONE = "",
	LISTENING = "Listening to P2P channel",
	CONNECTED = "Channel connected",
	PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
	PERMISSION_REQUEST_SUCCESS = "Wallet is connected",
}

export default function App({ Component, pageProps }: AppProps) {
	const [Tezos, setTezos] = useState<TezosToolkit>(new TezosToolkit("https://ghostnet.ecadinfra.com"))
	const [publicToken, setPublicToken] = useState<string | null>(null)
	const [wallet, setWallet] = useState<any>(null)
	const [userAddress, setUserAddress] = useState<string>("")
	const [userBalance, setUserBalance] = useState<number>(0)
	const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false)
	const [beaconConnection, setBeaconConnection] = useState<boolean>(false)

	// Ghostnet Increment/Decrement contract

	const generateQrCode = (): { __html: string } => {
		const qr = qrcode(0, "L")
		qr.addData(publicToken || "")
		qr.make()

		return { __html: qr.createImgTag(4) }
	}

	if (publicToken && (!userAddress || isNaN(userBalance))) {
		return (
			<ThemeProvider theme={theme}>
				<Box>
					<AppBar position="static">
						<Typography variant="h3">TacTic Total</Typography>
					</AppBar>{" "}
					<div id="dialog">
						<div id="content">
							<p className="text-align-center">
								<i className="fas fa-broadcast-tower"></i>&nbsp; Connecting to your wallet
							</p>
							<div dangerouslySetInnerHTML={generateQrCode()} className="text-align-center"></div>
							<p id="public-token">
								{copiedPublicToken ? (
									<span id="public-token-copy__copied">
										<i className="far fa-thumbs-up"></i>
									</span>
								) : (
									<span
										id="public-token-copy"
										onClick={() => {
											if (publicToken) {
												navigator.clipboard.writeText(publicToken)
												setCopiedPublicToken(true)
												setTimeout(() => setCopiedPublicToken(false), 2000)
											}
										}}>
										<i className="far fa-copy"></i>
									</span>
								)}

								<span>
									Public token: <span>{publicToken}</span>
								</span>
							</p>
							<p className="text-align-center">Status: {beaconConnection ? "Connected" : "Disconnected"}</p>
						</div>
					</div>
					<div id="footer">
						<img src="built-with-taquito.png" alt="Built with Taquito" />
					</div>
				</Box>
			</ThemeProvider>
		)
	} else if (userAddress && !isNaN(userBalance)) {
		return (
			<ThemeProvider theme={theme}>
				<Box>
					<AppBar
						sx={{
							display: "flex",
							flexDirection: "row",
							alignContent: "center",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "1em",
						}}
						position="static">
						<Typography variant="h3">TacTic Total</Typography>

						<p>
							<i className="far fa-address-card"></i>&nbsp; {userAddress}
						</p>
						<p>
							<i className="fas fa-piggy-bank"></i>&nbsp;
							{(userBalance / 1000000).toLocaleString("en-US")} ꜩ
						</p>
						<DisconnectButton
							wallet={wallet}
							setPublicToken={setPublicToken}
							setUserAddress={setUserAddress}
							setUserBalance={setUserBalance}
							setWallet={setWallet}
							setTezos={setTezos}
							setBeaconConnection={setBeaconConnection}
						/>
					</AppBar>

					<div id="dialog">
						<div id="content">
							<Component {...pageProps} />
						</div>
					</div>
				</Box>
			</ThemeProvider>
		)
	} else if (!publicToken && !userAddress && !userBalance) {
		return (
			<ThemeProvider theme={theme}>
				<Box>
					<AppBar
						sx={{
							display: "flex",
							flexDirection: "row",
							alignContent: "center",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "1em",
						}}
						position="static">
						<Typography variant="h3">TacTic Total</Typography>

						<ConnectButton
							Tezos={Tezos}
							setPublicToken={setPublicToken}
							setWallet={setWallet}
							setUserAddress={setUserAddress}
							setUserBalance={setUserBalance}
							setBeaconConnection={setBeaconConnection}
							wallet={wallet}
						/>
					</AppBar>
					<Container>
						<Typography textAlign={"center"}>Welcome to the Tactic Total!</Typography>
					</Container>
				</Box>
			</ThemeProvider>
		)
	} else {
		return <div>An error has occurred</div>
	}
}

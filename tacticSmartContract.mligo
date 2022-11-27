
type game = {
    players : (address * address);
    winner : address option;
  }

type games = (address, game) big_map

type storage = {
    games : games;
  }


type parameter =
  | StartGame of address
  | ResolveGame of address

let initial_storage : storage = {
    games = Big_map.empty;
  }

let get_game (address, store : address * storage) : game =
  match Big_map.find_opt address store.games with
  | Some game -> game
  | None -> failwith "Game not found!"

let check_player2 (address, game : address * game) : unit =
  if game.players.1 = address then
    () else
    failwith "Wrong player2"

let check_no_current_game (address, store : address * storage) : unit =
  match (Big_map.find_opt address store.games : game option) with
  | Some _ -> failwith "Game already in operation"
  | None -> ()

let start_game (player1, player2, store : address * address * storage) : storage =
  let _ = check_no_current_game ((Tezos.get_sender ()), store) in
  let game : game = { players = (player1, player2); winner = None; } in
  let new_games = Big_map.update player1 (Some game) store.games in
  { store with games = new_games }

let get_contract address : unit contract =
  match Tezos.get_contract_opt address with
  | Some x -> x
  | None -> failwith "Couldn't get contract from address"

let resolve_game(player1, winner, store : address * address * storage) : operation list * storage =
  let game = get_game (player1, store) in
  let _ = if winner <> player1 then check_player2 (winner, game) else () in
  let payment =  Tezos.transaction () 1000000tez (get_contract winner) in
  let new_games = Big_map.update player1 None store.games in
  [ payment ], { store with games = new_games }

let main (param, store : parameter * storage) : operation list * storage =
  match param with
  | StartGame address -> [], start_game ((Tezos.get_sender ()), address, store)
  | ResolveGame address -> resolve_game ((Tezos.get_sender ()), address, store)

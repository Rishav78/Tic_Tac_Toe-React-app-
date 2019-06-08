class Square extends React.Component{
	render(){
		return(
			<button onClick={this.props.onclick}> {this.props.value} </button>
		)
	}
}

class Board extends React.Component{
	constructor(){
		super()
		this.state = {
			squares: Array(9).fill(null),
			turn: true,
		}
	}
	handleClick = (i)=>{
		if( this.calculateWinner(this.state.squares) || this.state.squares[i]){
			return
		}
		this.setState((prev)=>{
			var squares = prev.squares
			squares[i] = prev.turn ? 'X' : 'O'
			return{
				turn: !prev.turn,
				squares
			}
		})
		this.calculateWinner(this.state.squares)
	}
	calculateWinner = (squares)=>{
	  const lines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6], [1, 4, 7],[0, 4, 8],[2, 4, 6],[2,5,8]];
	  for (let i = 0; i < lines.length; i++) {
	    const [a, b, c] = lines[i];
	    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	      	return squares[a];
	    }
	  }
	  return null;
	}
	draw = (squares)=>{
		for(var i=0;i<squares.length;i++){
			if(!squares[i]){
				return false
			}
		}
		return true
	}
	render(){
		const winner = this.calculateWinner(this.state.squares);
		const draw = this.draw(this.state.squares)
		console.log(draw)
	    let status = null;
	    if (winner) {
	      status = 'Winner: ' + winner;
	    }
		return(
			<div>
				<span>{ draw ? 'Draw' : (winner ? status : `Player  ${this.state.turn ? '1(X)' : '2(O)'} make your move`) }</span>
				<div>
					<Square onclick={()=> this.handleClick(0)} value={this.state.squares[0]} />
					<Square onclick={()=> this.handleClick(1)} value={this.state.squares[1]} />
					<Square onclick={()=> this.handleClick(2)} value={this.state.squares[2]} />
				</div>
				<div>
					<Square onclick={()=> this.handleClick(3)} value={this.state.squares[3]} />
					<Square onclick={()=> this.handleClick(4)} value={this.state.squares[4]} />
					<Square onclick={()=> this.handleClick(5)} value={this.state.squares[5]} />
				</div>
				<div>
					<Square onclick={()=> this.handleClick(6)} value={this.state.squares[6]} />
					<Square onclick={()=> this.handleClick(7)} value={this.state.squares[7]} />
					<Square onclick={()=> this.handleClick(8)} value={this.state.squares[8]} />
				</div>
			</div>
		)
	}
}
ReactDOM.render(<Board />, document.querySelector('.root'))
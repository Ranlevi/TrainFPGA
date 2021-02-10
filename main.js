class Station{
  constructor(name){
    this.name=name;
    this.rails={};//dest:rail
  }
}

class Rail{
  constructor(name, length, node1, node2){
    this.name=name;
    this.length=length;
    this.node1=node1;
    this.node2=node2;
  }
}

class Train{
  constructor(){
    this.node= null;
    this.speed=2;
    this.route=[`s2`, `s3`];
    this.distance_traveled=0;
    this.traveling_to_node2=false;
  }
}

let s1= new Station(`s1`);
let s2= new Station(`s2`);
let s3= new Station(`s3`);

let stations={
  "s1":s1,
  "s2":s2,
  "s3":s3
};

let r1= new Rail(`r1`, 10, `s1`, `s2`);
let r2= new Rail(`r2`, 14, `s2`, `s3`);

s1.rails[`s2`]= r1;
s2.rails[`s3`]= r2;

let t1= new Train();
t1.node=s1;
t1.traveling_to_node2=true;

let trains=[t1];

console.log(`Current Position: ${t1.node.name}`);

//game loop
setInterval(game_loop, 1000);

function game_loop(){
  
  for (let train of trains){
    
    if (train.node instanceof Station){
      
      let next_station= train.route.shift();
      train.node= train.node.rails[next_station];
      
    } else if (train.node instanceof Rail){
      
      if (train.distance_traveled===train.node.length){
        
        //reached end of the line
        if (train.traveling_to_node2){
          train.node= stations[train.node.node2];
        } else {
          train.node=stations[train.node.node1];
        }
        train.distance_traveled=0;
        
      } else {
        train.distance_traveled+=train.speed;
      }
    }
    console.log(`Pos: ${train.node.name}, Dis: ${train.distance_traveled}`);
  }
}


/*
Puzzle game
Solve train themed problems using FPGA like automation.
The game is in real time: you program each unit and it works in parralel with the rest.
The goal is to take inputs and convert them to required output.
The game does not punish you for mistakes - you just need to do more work

We have inputs and outputs, which are depots.
we have "units" which can be of several types. Each is programmable.
it can be stopped at will.
maybe add an implicit clock.

Basic is station: it does routing from multiple inputs to multiple outputs.
example: 
In 1 -> Out 1
If In 1 is RED -> Out 2
loop.

other units can be registers. look up tables. memory...


*/
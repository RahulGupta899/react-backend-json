//--------------------------------
//Problem 1:
//--------------------------------
let age = 23;
function Layer1(){
	console.log("Layer 1: ",this.age)   // undefined (Here this is pointing 
                                        //            to Global Object bcoz of 
                                        //            regular function call)
}
Layer1() // Regular Function Call


//--------------------------------
//Problem 2:
//--------------------------------
const obj = {
    name: 'Rahul Gupta',
    age: 23,
    buyProducts: function(){
        console.log("Inside buyProducts: ", this)  //obj (this is pointing to obj)
    }
}
obj.buyProducts() // Not a Regular function call

//--------------------------------
//Problem 3:
//--------------------------------
const obj = {
    name: "Purva Gupta",
    age: 13,
    tellStories: function(){
        console.log("Tell Stories: ",this)         // Obj{name: 'Purva Gupta'...}

        function regularFun(){
            console.log("Reguar Function: ",this)   //Global Object {}
        }
        regularFun() // Regular function Call
    },
    
}
obj.tellStories() // Non Regular function call



/*
    1. Organize cheatsheets
    2. Complete LCO - Backend
    3. Restructure GYM APP
    4. Make File sharing APP
*/
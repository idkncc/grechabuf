// import * as grechabuf from ".."
const grechabuf = require("..")

// struct declaration
const HelloWorldStruct = grechabuf.createStruct({
    health: grechabuf.i8(),
    food: grechabuf.i16(),
})

// serializing
const buffer = HelloWorldStruct.serialize({
    health: 69,
    food: 420,
})
console.log(buffer)

// deserializing
const data = HelloWorldStruct.deserialize(new DataView(buffer))
console.log(data)

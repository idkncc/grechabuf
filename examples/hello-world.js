// import * as grechabuf from ".."
const grechabuf = require("..")

// struct declaration
const HelloWorldStruct = grechabuf.createStruct({
    health: grechabuf.i8(),
    food: grechabuf.i16(),
})

// prepare ArrayBuffer & DataView
const buffer = new ArrayBuffer(HelloWorldStruct.size())
const dataView = new DataView(buffer)

// serializing
HelloWorldStruct.serialize(dataView, {
    health: 69,
    food: 420,
})
console.log(buffer)

// deserializing
const data = HelloWorldStruct.deserialize(dataView)
console.log(data)

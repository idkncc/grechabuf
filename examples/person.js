// import * as grechabuf from ".."
const grechabuf = require("..")

// declaration
const PersonStruct = grechabuf.createStruct({
    name: grechabuf.string(),

    // array of strings
    roles: grechabuf.array(
        grechabuf.string()
    ),

    health: grechabuf.i8(),
    food: grechabuf.i8(),
    moving: grechabuf.i8(),
})

// serializing
const buffer = PersonStruct.serialize({
    name: "John Doe",
    roles: ["Admin", "TsodingSessionsEnjoyer"],
    health: 1,
    food: 1,
    moving: 1,
})
console.log(buffer)

// deserializing
const data = PersonStruct.deserialize(new DataView(buffer))
console.log(data)

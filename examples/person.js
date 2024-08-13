// import * as grechabuf from ".."
const grechabuf = require("..")

const PersonStruct = grechabuf.createStruct({
    name: grechabuf.string(),
    roles: grechabuf.array(
        grechabuf.string()
    ),
    health: grechabuf.i8(),
    food: grechabuf.i8(),
    moving: grechabuf.i8(),
})

const buffer = new ArrayBuffer(64)
const dataView = new DataView(buffer)

const serializedDataLength = PersonStruct.serialize(dataView, {
    name: "John Doe",
    roles: ["Admin", "TsodingSessionsEnjoyer"],
    health: 100,
    food: 69,
    moving: 0b01001000,
})
console.log(buffer)
console.log(`Used ${serializedDataLength} bytes`)
console.log("")

const data = PersonStruct.deserialize(dataView)
console.log(data)

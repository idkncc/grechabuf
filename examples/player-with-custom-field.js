// import * as grechabuf from ".."
const grechabuf = require("..")

const vector2 = () => {
    /** @type {grechabuf.Field<{x: number, y: number}>} */
    return {
        size(value) {
            return 4 + 4
        },
        serialize(view, position, value) {
            view.setFloat32(position, value.x)
            view.setFloat32(position + 4, value.y)
            return 4 + 4
        },
        deserialize(view, position) {
            return {
                data: {
                    x: view.getFloat32(position),
                    y: view.getFloat32(position + 4)
                },
                length: 4 + 4
            }
        }
    }
}

// struct declaration
const PlayerStruct = grechabuf.createStruct({
    name: grechabuf.string(),
    health: grechabuf.i8(),
    food: grechabuf.i8(),
    position: vector2(),
})

// serializing
const buffer = PlayerStruct.serialize({
    name: "John Doe",
    health: 100,
    food: 100,
    position: { x: 7.5, y: 1 },
})
console.log(buffer)

// deserializing
const data = PlayerStruct.deserialize(new DataView(buffer))
console.log(data)

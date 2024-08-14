# Grechabuf

binary data (de)serializer, highly inspired by [Tsoding's multiplayer prototype](https://github.com/tsoding/multiplayer-game-prototype)

```ts
// just declare struct
const PersonStruct = grechabuf.createStruct({
    name: grechabuf.string(),
    roles: grechabuf.array(
        grechabuf.string()
    ),
    health: grechabuf.i8(),
    food: grechabuf.i8(),
    lostBrainCells: grechabuf.u32(),
})

// and just serialize!
const buffer = PersonStruct.serialize({
    name: "John Doe",
    roles: ["Admin", "TsodingSessionsEnjoyer"],
    health: 100,
    food: 77,
    lostBrainCells: 69420
})
```

## "why don't use my favourite Protobuf!?!??"
 - Protobuf is bloated dependency _(its like opening json in Visual Studio)_
 - Grechabuf has no dependencies _(only `devDependencies` for building and testing)_
 - Grechabuf is singlefile .ts/.cjs/.mjs to use
 - Grechabuf is easy to expand [(see custom fields)](#custom-fields)
 - Grechabuf has TypeScript support

## installation
- With NPM (with bundler on web)
   ```shell
   npm install grechabuf
   yarn add grechabuf
   pnpm add grechabuf
   ```
- From Github:
  - If you using Javascript: go to [`/dist`](./dist/) folder and grab here .cjs/.mjs files
  - If you using Typescript: grab [`grachabuf.ts`](./grechabuf.ts) and copy it to your project

## examples
[(go to examples/)](examples/)

## custom fields
```ts
type Vector2 = { x: number, y: number }

//   deserialized type ---vvvvvvv
const vector2 = (): Field<Vector2> => {
    return {
        // calculate size for certain value (useful for strings/arrays/other dynamic values)
        size(value) {
            return 4 + 4
        },

        // serialization
        // takes DataView, position (byteOffset) and value (javascript value)
        // returns count of written bytes
        serialize(view, position, value) {
            view.setFloat32(position, value.x)
            view.setFloat32(position + 4, value.y)
            return 4 + 4
        },

        // deserialization
        // takes DataView, position (byteOffset)
        // returns object
        deserialize(view, position) {
            return {
                // deserialized data
                data: {
                    x: view.getFloat32(position),
                    y: view.getFloat32(position + 4)
                },

                // count of read bytes
                length: 4 + 4
            }
        }
    }
}


// And then use it!

const SomeStruct = grechabuf.createStruct({
    someField: vector2()
})

SomeStruct.serialize({
    someField: { x: 123.4, y: 567.8 }
})
```

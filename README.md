# Grechabuf

Binary data (de)serializer, highly inspired by [Tsoding's multiplayer prototype](https://github.com/tsoding/multiplayer-game-prototype)

## why didnt you use the Protobuf!???
 - Protobuf is bloated dependency
 - Grechabuf is singlefile .ts/.js to use
 - Grechabuf is extandable

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

## custom fields
```ts

//       javascript type ---vvvvvv
export const fooBar = (): Field<number> => {
    return {
        // aproximated size
        size(_view, _position) {
            return 1
        },

        // serialization
        // takes DataView, position (byteOffset) and value (javascript value)
        // returns count of written bytes
        serialize(view, position, value) {
            view.setInt8(position, value)
            return 1
        },

        // deserialization
        // takes DataView, position (byteOffset)
        // returns object
        deserialize(view, position) {
            return {
                // deserialized data
                data: view.getInt8(position),

                // count of read bytes
                length: 1
            }
        }
    }
}


// And then use it!

const SomeStruct = grechabuf.createStruct({
    someField: fooBar()
})
```

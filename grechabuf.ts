export interface FieldSerializeResult<T> {
    data: T,
    length: number
}

export interface Field<T> {
    /**
     * Calculate byte size
     *
     * @param value {T} value
     *
     * @returns {number} minimal field length
     */
    size(value: T): number

    /**
     * Serialize field
     *
     * @param view {DataView} data view
     * @param position {number} AKA offset
     * @param value {T} value to serialize
     *
     * @returns {number} size of written field
     */
    serialize(view: DataView, position: number, value: T): number

    /**
     * Deserialize field
     *
     * @param view {DataView} data view
     * @param position {number} AKA offset
     *
     * @returns {number} size of written field
     */
    deserialize(view: DataView, position: number): FieldSerializeResult<T>
}

type Fields = Record<string, Field<any>>

type InferFieldsValues<T extends Fields> = {
    [K in keyof T]: T[K] extends Field<infer U> ? U : never;
};

/**
 * Struct declaration
 *
 * Used for serializing/deserializing structs
 */
export interface Struct<F extends Fields> {
    /**
     * Calculate size of buffer
     *
     * @returns {number} size of buffer
     */
    size(data: InferFieldsValues<F>): number,

    /**
     * Serialize struct, returning with new ArrayBuffer
     *
     * @param data {InferFieldsValues<F>} data to serialize
     *
     * @returns {ArrayBuffer} serialized data
     */
    serialize(data: InferFieldsValues<F>): ArrayBuffer

    /**
     * Serialize struct into data view
     *
     * @param view {DataView} data view
     * @param data {InferFieldsValues<F>} data to serialize
     *
     * @returns {number} length of serialized data
     */
    serializeInto(view: DataView, data: InferFieldsValues<F>): number

    /**
     * Deserialize struct from data view
     *
     * @param view {DataView} data view
     * @param data {InferFieldsValues<F>} data to serialize
     *
     * @returns {number} length of serialized data
     */
    deserialize(view: DataView, position?: number): InferFieldsValues<F>
}

/**
*
* @param fields {{[name: string]: Field }}
* @returns {Struct} created struct declaration
*/
export function createStruct<F extends Fields>(fields: F): Struct<F> {
    return {
        size(data: InferFieldsValues<F>) {
            let size = 0

            for (const [fieldName, fieldType] of Object.entries(fields)) {
                size += fieldType.size(data[fieldName])
            }

            return size
        },

        serialize(data: InferFieldsValues<F>) {
            const buffer = new ArrayBuffer(this.size(data))
            const view = new DataView(buffer)

            let position = 0
            for (const [fieldName, fieldType] of Object.entries(fields)) {
                position += fieldType.serialize(view, position, data[fieldName])
            }

            return buffer
        },

        serializeInto(view: DataView, data: InferFieldsValues<F>, position = 0) {
            const initialPosition = position;

            for (const [fieldName, fieldType] of Object.entries(fields)) {
                position += fieldType.serialize(view, position, data[fieldName])
            }

            return position - initialPosition
        },

        deserialize(view, position = 0) {
            let result: Record<string, any> = {}

            for (const [fieldName, fieldType] of Object.entries(fields)) {
                const { data, length } = fieldType.deserialize(view, position)

                result[fieldName] = data
                position += length
            }

            return result as InferFieldsValues<F>
        }
    }
}


// Field Types

export const i8 = (): Field<number> => {
    return {
        size(_value): number {
            return 1
        },
        serialize(view, position, value) {
            view.setInt8(position, value)
            return 1
        },
        deserialize(view, position) {
            return {
                data: view.getInt8(position),
                length: 1
            }
        }
    }
}

export const u8 = (): Field<number> => {
    return {
        size(_value): number {
            return 1
        },
        serialize(view, position, value) {
            view.setUint8(position, value)
            return 1
        },
        deserialize(view, position) {
            return {
                data: view.getUint8(position),
                length: 1
            }
        }
    }
}

export const i16 = (): Field<number> => {
    return {
        size(_value): number {
            return 2
        },
        serialize(view, position, value) {
            view.setInt16(position, value)
            return 2
        },
        deserialize(view, position) {
            return {
                data: view.getInt16(position),
                length: 2
            }
        }
    }
}

export const u16 = (): Field<number> => {
    return {
        size(_value): number {
            return 2
        },
        serialize(view, position, value) {
            view.setUint16(position, value)
            return 2
        },
        deserialize(view, position) {
            return {
                data: view.getUint16(position),
                length: 2
            }
        }
    }
}

export const i32 = (): Field<number> => {
    return {
        size(_value): number {
            return 4
        },
        serialize(view, position, value) {
            view.setInt32(position, value)
            return 4
        },
        deserialize(view, position) {
            return {
                data: view.getInt32(position),
                length: 4
            }
        }
    }
}

export const u32 = (): Field<number> => {
    return {
        size(_value): number {
            return 4
        },
        serialize(view, position, value) {
            view.setUint32(position, value)
            return 4
        },
        deserialize(view, position) {
            return {
                data: view.getUint32(position),
                length: 4
            }
        }
    }
}

export const f32 = (): Field<number> => {
    return {
        size(_value): number {
            return 4
        },
        serialize(view, position, value) {
            view.setFloat32(position, value)
            return 4
        },
        deserialize(view, position) {
            return {
                data: view.getFloat32(position),
                length: 4
            }
        }
    }
}

export const f64 = (): Field<number> => {
    return {
        size(_value): number {
            return 4
        },
        serialize(view, position, value) {
            view.setFloat64(position, value)
            return 4
        },
        deserialize(view, position) {
            return {
                data: view.getFloat64(position),
                length: 4
            }
        }
    }
}

export const bool = (): Field<boolean> => {
    return {
        size(_value): number {
            return 1
        },
        serialize(view, position, value) {
            view.setUint8(position, value ? 0xFF : 0x00)
            return 1
        },
        deserialize(view, position) {
            return {
                data: view.getUint8(position) > 0x55,
                length: 1
            }
        }
    }
}

/**
 * String field (dynamic)
 *
 * Up to 255 characters long
 *
 * @returns {Field<string>}
 */
export const string = (): Field<string> => {
    return {
        size(value): number {
            return value.length + 1
        },

        serialize(view, position, value) {
            view.setUint8(position, value.length)

            const chars = value
                .split("")
                .map((_, i) => [i, value.charCodeAt(i)])
            for (const [offset, char] of chars) {
                view.setUint8(position + offset + 1, char)
            }

            return value.length + 1
        },

        deserialize(view, position) {
            const length = view.getUint8(position)
            let chars = []

            for (let offset = 0; offset < length; offset++) {
                chars.push(view.getUint8(position + offset + 1))
            }

            return {
                data: String.fromCodePoint(...chars),
                length: length + 1
            }
        }
    }
}

/**
 * Long String field (dynamic)
 *
 * Up to 65536 characters long
 *
 * @returns {Field<string>}
 */
export const longString = (): Field<string> => {
    return {
        size(value): number {
            return value.length + 2
        },

        serialize(view, position, value) {
            view.setUint16(position, value.length)

            const chars = value
                .split("")
                .map((_, i) => [i, value.charCodeAt(i)])
            for (const [offset, char] of chars) {
                view.setUint8(position + offset + 2, char)
            }

            return value.length + 1
        },

        deserialize(view, position) {
            const length = view.getUint16(position)
            let chars = []

            for (let offset = 0; offset < length; offset++) {
                chars.push(view.getUint8(position + offset + 2))
            }

            return {
                data: String.fromCodePoint(...chars),
                length: length + 2
            }
        }
    }
}

/**
 * Array field (dynamic)
 *
 * Up to 255 element long
 *
 * @returns {Field<T>}
 */
export const array = <T>(type: Field<T>): Field<T[]> => {
    return {
        size(value) {
            return value.map((v) => type.size(v)).reduce((a, b) => a + b, 1)
        },

        serialize(view, position, array) {
            view.setUint8(position, array.length)

            let offset = 0
            for (const value of array) {
                offset += type.serialize(view, position + offset + 1, value)
            }

            return offset + 1
        },

        deserialize(view, position) {
            const length = view.getUint8(position)

            let array = []
            let offset = 0
            for (let i = 0; i < length; i++) {
                const { data, length } = type.deserialize(view, position + offset + 1)
                array.push(data)
                offset += length
            }

            return {
                data: array,
                length: offset + 1
            }
        }
    }
}

/**
 * Long Array field (dynamic)
 *
 * Up to 65536 element long
 *
 * @returns {Field<T>}
 */
export const longArray = <T>(type: Field<T>): Field<T[]> => {
    return {
        size(value) {
            return value.map((v) => type.size(v)).reduce((a, b) => a + b, 2)
        },

        serialize(view, position, array) {
            view.setUint16(position, array.length)

            let offset = 0
            for (const value of array) {
                offset += type.serialize(view, position + offset + 1, value)
            }

            return offset + 1
        },

        deserialize(view, position) {
            const length = view.getUint16(position)

            let array = []
            let offset = 0
            for (let i = 0; i < length; i++) {
                const { data, length } = type.deserialize(view, position + offset + 1)
                array.push(data)
                offset += length
            }

            return {
                data: array,
                length: offset + 2
            }
        }
    }
}

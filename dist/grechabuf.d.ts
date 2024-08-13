export interface FieldSerializeResult<T> {
    data: T;
    length: number;
}
export interface Field<T> {
    /**
     * Apoximated bytes length
     *
     * @param view {DataView} data view
     * @param position {number} AKA offset
     *
     * @returns {number} minimal field length
     */
    size(view?: DataView, position?: number): number;
    /**
     * Serialize field
     *
     * @param view {DataView} data view
     * @param position {number} AKA offset
     * @param value {T} value to serialize
     *
     * @returns {number} size of written field
     */
    serialize(view: DataView, position: number, value: T): number;
    /**
     * Deserialize field
     *
     * @param view {DataView} data view
     * @param position {number} AKA offset
     *
     * @returns {number} size of written field
     */
    deserialize(view: DataView, position: number): FieldSerializeResult<T>;
}
type Fields = Record<string, Field<any>>;
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
     * Get size of buffer
     *
     * If `view` not passed, returns minimal required size of buffer (because strings have dynamic size)
     *
     * @returns {number} required size of buffer
     */
    size(view: DataView): number;
    /**
     * Serialize struct
     *
     * @param view {DataView} data view
     * @param data {InferFieldsValues<F>} data to serialize
     *
     * @returns {number} length of serialized data
     */
    serialize(view: DataView, data: InferFieldsValues<F>): number;
    deserialize(view: DataView, position?: number): InferFieldsValues<F>;
}
/**
*
* @param fields {{[name: string]: Field }}
* @returns {Struct} created struct declaration
*/
export declare function createStruct<F extends Fields>(fields: F): Struct<F>;
export declare const i8: () => Field<number>;
export declare const u8: () => Field<number>;
export declare const i16: () => Field<number>;
export declare const u16: () => Field<number>;
export declare const i32: () => Field<number>;
export declare const u32: () => Field<number>;
export declare const f32: () => Field<number>;
export declare const f64: () => Field<number>;
/**
 * String field (dynamic)
 *
 * Up to 255 characters long
 *
 * @returns {Field<string>}
 */
export declare const string: () => Field<string>;
/**
 * Long String field (dynamic)
 *
 * Up to 65536 characters long
 *
 * @returns {Field<string>}
 */
export declare const longString: () => Field<string>;
/**
 * Array field (dynamic)
 *
 * Up to 255 element long
 *
 * @returns {Field<T>}
 */
export declare const array: <T>(type: Field<T>) => Field<T[]>;
/**
 * Long Array field (dynamic)
 *
 * Up to 65536 element long
 *
 * @returns {Field<T>}
 */
export declare const longArray: <T>(type: Field<T>) => Field<T[]>;
export {};

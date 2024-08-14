const grechabuf = require("..")

test('integers', () => {
    const Struct = grechabuf.createStruct({
        fieldInt8: grechabuf.i8(),
        fieldInt16: grechabuf.i16(),
        fieldInt32: grechabuf.i32(),
    })

    const data = {
        fieldInt8: 69,
        fieldInt16: -420,
        fieldInt32: 123_456_789,
    }

    const buffer = Struct.serialize(data)

    const result = Struct.deserialize(new DataView(buffer))

    expect(result).toEqual(data);
});

test('unsigned integers', () => {
    const Struct = grechabuf.createStruct({
        fieldInt8: grechabuf.u8(),
        fieldInt16: grechabuf.u16(),
        fieldInt32: grechabuf.u32(),
    })

    const data = {
        fieldInt8: 200,
        fieldInt16: 25565,
        fieldInt32: 2_000_000_000,
    }

    const buffer = Struct.serialize(data)

    const result = Struct.deserialize(new DataView(buffer))

    expect(result).toEqual(data);
});

test('floats', () => {
    const Struct = grechabuf.createStruct({
        someFloatField: grechabuf.f32(),
    })

    const data = {
        someFloatField: 3.5,
    }

    const buffer = Struct.serialize(data)

    const result = Struct.deserialize(new DataView(buffer))

    expect(result).toEqual(data);
});

test('strings', () => {
    const Struct = grechabuf.createStruct({
        name: grechabuf.string(),
        description: grechabuf.longString(),
    })

    const data = {
        name: "John Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut magna cursus, molestie mauris a, dapibus metus. Mauris consequat nisi neque, vitae scelerisque eros rutrum lacinia. Morbi imperdiet sollicitudin efficitur. Nam cursus tempor risus, et tempus justo ultricies euismod. Nam lobortis ultrices mauris a mollis. Duis nec tortor et lectus fermentum tempor. Quisque fringilla at ante ut interdum. Aenean fringilla, risus ac venenatis porta, mauris sapien pretium enim, gravida convallis turpis leo euismod nibh. Donec pharetra dolor turpis, varius hendrerit neque venenatis et. Nulla nisl ante, interdum vitae pellentesque eget, vehicula nec orci. Phasellus eget gravida tortor. Nam egestas libero ac leo suscipit, a fringilla urna tincidunt. Donec vulputate non libero eget lacinia. Pellentesque diam justo, eleifend id porttitor ac, blandit et nunc. Etiam varius libero sed egestas euismod. Etiam lacinia efficitur erat nec hendrerit.",
    }

    const buffer = Struct.serialize(data)

    const result = Struct.deserialize(new DataView(buffer))

    expect(result).toEqual(data);
});

test('arrays', () => {
    const Struct = grechabuf.createStruct({
        favouriteNumbers: grechabuf.array(
            grechabuf.i32()
        ),
        // currenly removed due unstability
        // fooBars: grechabuf.longArray(
        //     grechabuf.bool()
        // ),
        scene: grechabuf.array(
            grechabuf.array(
                grechabuf.bool()
            )
        )
    })

    const WALL = true;
    const empt = false;
    const data = {
        favouriteNumbers: [69, 420, 3_141592, 1337, 123456, 85, 82, 77, 79, 77],
        // fooBars: new Array(1000)
        //     .fill(0)
        //     .map(() => Math.random() >= .5),
        scene: [
            [empt, empt, WALL, WALL, WALL, empt, empt],
            [empt, empt, empt, empt, empt, WALL, empt],
            [WALL, empt, empt, empt, empt, WALL, empt],
            [WALL, empt, empt, empt, empt, WALL, empt],
            [WALL, empt, empt, empt, empt, empt, empt],
            [empt, WALL, WALL, WALL, empt, empt, empt],
            [empt, empt, empt, empt, empt, empt, empt],
        ]
    }

    const buffer = Struct.serialize(data)

    const result = Struct.deserialize(new DataView(buffer))

    expect(result).toEqual(data);
});

test('other', () => {
    const Struct = grechabuf.createStruct({
        zigDevsAnnoyed: grechabuf.bool(),
    })

    const data = {
        zigDevsAnnoyed: true,
    }

    const buffer = Struct.serialize(data)

    const result = Struct.deserialize(new DataView(buffer))

    expect(result).toEqual(data);
});

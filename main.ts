//% color=#0fbc11"
namespace CubeSat {
    let MyAddr = {
        ADDR: 0x76
    };

    let BME280_I2C_ADDRESS = {
        ADDR_0x76: 0x76
    };

    let MyType = {
        STANDARD: 0
    };

    let MyEnum = {
        PM1_0: 0,
        PM2_5: 1
    };

    //% blockId=start_connect block="Start Connect"
    export function startConnect(): void {
        serial.redirect(SerialPin.P14, SerialPin.P15, BaudRate.BaudRate115200);
        custom.setAddr(MyAddr.ADDR);
        BME280.Address(BME280_I2C_ADDRESS.ADDR_0x76);
        OLED12864_I2C.init(60);
    }

    //% blockId=get_pm10 block="Get PM1.0 at height %displayHeight"
    export function getPM10(displayHeight: number): void {
        OLED12864_I2C.showString(0, displayHeight - 1, "PM 1.0 : ", 1);
        OLED12864_I2C.showNumber(70, displayHeight - 1, custom.gainParticleConcentration_ugm3(MyType.STANDARD, MyEnum.PM1_0), 1);
        basic.pause(100);
    }

    //% blockId=i2c_write block="Write sensor data to serial"
    export function i2cWrite(): void {
        serial.writeLine("101");
        serial.writeString(`${Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P2)},`);
        serial.writeString(`${Environment.dht11value(Environment.DHT11Type.DHT11_humidity, DigitalPin.P2)},`);
        serial.writeString(`${Math.round(pins.analogReadPin(AnalogReadWritePin.P1) / 10)},`);
        serial.writeString(`${input.compassHeading()},`);
        serial.writeString(`${input.lightLevel()},`);
        serial.writeString(`${custom.gainParticleConcentration_ugm3(MyType.STANDARD, MyEnum.PM2_5)},`);
        serial.writeString("102");
    }

    //% blockId=get_gas block="Get Gas at height %displayHeight"
    export function getGas(displayHeight: number): void {
        OLED12864_I2C.showString(0, displayHeight - 1, "Gas : ", 1);
        OLED12864_I2C.showNumber(70, displayHeight - 1, pins.analogReadPin(AnalogReadWritePin.P1), 1);
        basic.pause(100);
    }

    //% blockId=get_temp block="Get Temperature at height %displayHeight"
    export function getTemp(displayHeight: number): void {
        OLED12864_I2C.showString(0, displayHeight - 1, "Temp : ", 1);
        OLED12864_I2C.showNumber(70, displayHeight - 1, Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P2), 1);
        basic.pause(100);
    }

    //% blockId=get_pm25 block="Get PM2.5 at height %displayHeight"
    export function getPM25(displayHeight: number): void {
        OLED12864_I2C.showString(0, displayHeight - 1, "PM 2.5 : ", 1);
        OLED12864_I2C.showNumber(70, displayHeight - 1, custom.gainParticleConcentration_ugm3(MyType.STANDARD, MyEnum.PM2_5), 1);
        basic.pause(100);
    }

    //% blockId=get_hum block="Get Humidity at height %displayHeight"
    export function getHum(displayHeight: number): void {
        OLED12864_I2C.showString(0, displayHeight - 1, "Hum : ", 1);
        OLED12864_I2C.showNumber(70, displayHeight - 1, Environment.dht11value(Environment.DHT11Type.DHT11_humidity, DigitalPin.P2), 1);
        basic.pause(100);
    }
}
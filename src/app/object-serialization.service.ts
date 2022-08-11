import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectSerializationService {

  static readonly STREAM_MAGIC: number = 0xaced;
  static readonly STREAM_VERSION: number = 5;
  static readonly TC_NULL: number = 0x70;
  static readonly TC_REFERENCE: number = 0x71;
  static readonly TC_CLASSDESC: number = 0x72;
  static readonly TC_OBJECT: number = 0x73;
  static readonly TC_STRING: number = 0x74;
  static readonly TC_ARRAY: number = 0x75;
  static readonly TC_CLASS: number = 0x76;
  static readonly TC_BLOCKDATA: number = 0x77;
  static readonly TC_ENDBLOCKDATA: number = 0x78;
  static readonly TC_RESET: number = 0x79;
  static readonly TC_BLOCKDATALONG: number = 0x7A;
  static readonly TC_EXCEPTION: number = 0x7B;
  static readonly TC_LONGSTRING: number = 0x7C;
  static readonly TC_PROXYCLASSDESC: number = 0x7D;
  static readonly TC_ENUM: number = 0x7E;
  static readonly baseWireHandle: number = 0x7E0000;

  static readonly SC_WRITE_METHOD: number = 0x01;
  static readonly SC_BLOCK_DATA: number = 0x08;
  static readonly SC_SERIALIZABLE: number = 0x02;
  static readonly SC_EXTERNALIZABLE: number = 0x04;
  static readonly SC_ENUM: number = 0x10;

  private readonly cons = ObjectSerializationService;
  private buffer: number[] = [];
  private position: number = -1;

  constructor() { }

  public read(buffer: number[]): any {
    this.position = -1;
    this.buffer = [...buffer];
    const la = this.lookAhead();
    console.log(la);
    try {
      if (la == undefined) {
        return;
      }
      if (la === this.cons.TC_BLOCKDATA) {
        return ObjectSerializationService.readBlockDataShort();
      } else if (la === this.cons.TC_BLOCKDATALONG) {
        return ObjectSerializationService.readBlockDataLong();
      } else {
        return this.readObject();
      }
    } catch (err) {
      throw err;
    }
  }

  private readObject(): any {
    const la = this.lookAhead();
    if (la === this.cons.TC_OBJECT) {
      this.readNewObject();
    } else if (la === this.cons.TC_CLASS) {
      ObjectSerializationService.readNewClass();
    }
  }

  private readNewObject() {
    let obj = {
      $: {},
      $class: null
    }
    // @ts-ignore
    let $class = obj.$class = this.readClassDesc();
  }

  private readClassDesc() {
    const la = this.lookAhead();
    let classDesc;
    if (la === this.cons.TC_CLASSDESC) {
      return this.readNewClassDesc();
    } else if (la === this.cons.TC_REFERENCE) {
      return this.readPrevObject();
    } else if (la === this.cons.TC_NULL) {
      return this.readNull();
    } else {
      throw new Error("Illegal lookahead: 0x" + la.toString(16));
    }
  }

  private readPrevObject() {
    return 0;
  }

  private readNull() {
    return null;
  }

  private readNewClassDesc() {
    const la = this.lookAhead();
    if (la === this.cons.TC_CLASSDESC) {
      return this.readNonProxyDesc();
    } else if (la === this.cons.TC_PROXYCLASSDESC) {
      throw new Error("Not implemented Proxy class description");
    } else {
      throw new Error("Illegal lookahead: 0x" + la.toString(16));
    }
  }

  private readNonProxyDesc() {
    let obj = {
      name: this.readUTFString(),
      serialVersionUID: this.readLong().toString()
    }
  }

  private readLong(): number {
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      const la = this.lookAhead();
      if (la != undefined) {
        sum += la;
      }
    }
    return sum;
  }

  private readUTFString(): string {
    return "";
  }

  private static readNewClass() {
    throw new Error("Not implemented readNewClass");
  }

  private lookAhead(): number {
    if (this.position + 1 >= this.buffer.length) {
      throw new Error("End of buffer reached");
    }
    return this.buffer[++this.position];
  }

  private static readBlockDataShort() {
    throw new Error("Not implemented readBlockDataShort");
  }

  private static readBlockDataLong() {
    throw new Error("Not implemented readBlockDataLong");
  }
}

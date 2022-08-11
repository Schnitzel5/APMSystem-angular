import { Component, OnInit } from '@angular/core';
import {ObjectSerializationService} from "../object-serialization.service";

@Component({
  selector: 'app-myeasydb-web',
  templateUrl: './myeasydb-web.component.html',
  styleUrls: ['./myeasydb-web.component.scss']
})
export class MyeasydbWebComponent implements OnInit {

  private object: ObjectSerializationService | undefined;
  file: File | undefined;

  constructor(object: ObjectSerializationService) {
    this.object = object;
  }

  ngOnInit(): void {
  }

  importFile(event: any) {
    const file: File = event.target.files[0];
    console.log(file.name);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (e) => {
      if (e == null || e.target == null || e.target.result == null) {
        return;
      }
      const a = e.target.result;
      const b = Array.from(new Uint8Array(a as ArrayBuffer));
      console.log(a);
      /*for (let i of b) {
        console.log("0x" + i.toString(16));
      }*/
      const result = this.object?.read(b);
      console.log(result);
    });
    fileReader.readAsArrayBuffer(file);
    this.file = file;
  }

}

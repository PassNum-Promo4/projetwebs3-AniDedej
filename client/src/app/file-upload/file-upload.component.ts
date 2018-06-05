import { Component, OnInit } from '@angular/core';
import { FileUploadService } from "../file-upload.service";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File = null;

  constructor (private uploadService: FileUploadService, private auth: AuthService, public userService: UserService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  sendImage() {
    if (this.fileToUpload) {
      this.uploadService.postFile(this.fileToUpload, this.auth.username).subscribe(res => {
        console.log(res);
      });
    }
  }

}

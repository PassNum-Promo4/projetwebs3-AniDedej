import { Component, OnInit, Input } from '@angular/core';
import { SharedContentService } from "../../../shared-content.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.css']
})
export class InfoListComponent implements OnInit {

  @Input() content: any;

  selectedContent: any;

  constructor(private route: ActivatedRoute, private sharedService: SharedContentService) {
  }

  ngOnInit() {
  }

  onSelect(content: any): void {
    this.selectedContent = content;
    console.log(this.selectedContent._id);
  }

}

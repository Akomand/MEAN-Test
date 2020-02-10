import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';                   // Import angular router
import { MatTableDataSource } from '@angular/material';     // Import the table data source

import { Issue } from '../../issue.model';    // Import the Issue model
import { IssueService } from '../../issue.service';   // Import the issue service

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  constructor(private issueService: IssueService, private router: Router) { }

  // Lifecycle method
  ngOnInit() {
    this.fetchIssues();
    /*this.issueService.getIssues().subscribe((issues) => {   // Get List of issues through Issue service 
      console.log(issues);
    });*/
  }

  // Done in List Component
  fetchIssues() {               // Fetch the issues
    this.issueService.getIssues()
    .subscribe((data: Issue[]) => {
      this.issues = data;
      console.log("Data Requested...");
      console.log(this.issues);
    });
  }

  // Event handler to edit an issue (done in the edit issue component)
  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  // Event handler to delete an issue
  deleteIssue(id) {     // Observable returned from subscribe
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}

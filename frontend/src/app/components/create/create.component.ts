import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';    // Import forms for the create
import { Router } from '@angular/router';     // Import router as standard
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  // Inject services
  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],     // required field
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
   }

   addIssue(title, responsible, description, severity, status) {        // add the issue to the database
     this.issueService.addIssue(title, responsible, description, severity, status).subscribe(() => {
        this.router.navigate(['/list']);      // route back to the list once created
     });    
   }

  ngOnInit() {
  }


}

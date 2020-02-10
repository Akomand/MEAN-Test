import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:4000';
  // Perform http injection by including in constructor of service class. Private field because not needed externally. Type HttpClient
  constructor(private http: HttpClient) { }   
  
  getIssues() {
    return this.http.get(`${this.uri}/issues`);     // GET request
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);     // GET request by ID
  }

  addIssue(title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };

    return this.http.post(`${this.uri}/issues/add/`, issue);    // POST Request
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };

    return this.http.post(`${this.uri}/issues/update/${id}`, issue);    // POST Request (Update)
  }

  deleteIssue(id) {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }

}

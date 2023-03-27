import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'buzzinga';
  token = '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';

  constructor(    
    private httpClient: HttpClient
    ){

  }

  makePost(){

    
        this.postAPI().subscribe((res)=>{
            console.log(res);
            alert("Issue Created");
          },(error:any)=>{
            alert("Failed To Create Issue");
          })
      
    
    
  }

    postAPI(){
      console.log("make post");
      
      let httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "token " + this.token,
          'Accept': 'application/vnd.github.v3+json'
        })
      }
    
      
       let API_URL = "https://api.github.com/repos/lasertruf/buzzinga/issues"
      // let API_URL = "https://api.github.com/repos/lasertruf/fridaygoals/issues"
      let body = {
        title : 'Title #!',
        body : 'Body, text random!!!',
        // assignees:["lasertruf"]
        // owner: 'lasertruf',
        // repo: 'fridayGoals',
      }
     
     
      // let issuesUrl = "https://github.com/lasertruf/fridaygoals/issues"
       
       return this.httpClient.post(API_URL,body,httpHeaders)
            .pipe(map((res:any ) => {              
                return res;
        }));
    }

    showPosts(){
      this.getAPI().subscribe((res)=>{
        console.log(res);
      },(error:any)=>{
      })
  
    }
    
    getAPI(){
      let httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "token " + this.token,
          'Accept': 'application/vnd.github.v3+json'
        })
      }

      let API_URL = "https://api.github.com/repos/lasertruf/buzzinga/issues"


      return this.httpClient.get(API_URL)
      .pipe(map((res:any ) => {              
          return res;
  }));
    }
  
}

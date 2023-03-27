import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CreatePostComponent } from '../create-post/create-post.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token = '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';
  postsArr : any = [];
  constructor(    
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private router : Router
    ){
      router.navigate(['home'])
      this.postsArr = [1,2,3,4,5,6,7,8,9,10]
  }


  openDialog() {
    this.dialog.open(CreatePostComponent, {
      data: {
        animal: 'panda',
      },
    });
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

  ngOnInit(): void {
  }

}

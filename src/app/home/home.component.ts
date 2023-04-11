import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CreatePostComponent } from '../create-post/create-post.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token = environment.gh_key;
  postsArr : any = [];
  postInput:any;
  authorInput:any;
  imgResultBeforeCompress!:string;
  imgResultAfterCompress!:string;


  constructor(    
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private router : Router,
    private imageCompress: NgxImageCompressService
    ){
      router.navigate(['home'])
      // this.postsArr = [1,2,3]
  }



  openDialog() {
    this.dialog.open(CreatePostComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  makePost(){
    let postbody = '';
        if(this.postInput.length>0){
          if (this.authorInput.length<=0) {
            postbody = this.postInput + "[Auth] - " + "Anonymous";
          }else{
            postbody = this.postInput + "[Auth] - " + this.authorInput;
          }
          this.postAPI(postbody)
          .subscribe((res)=>{
              console.log(res);
              // alert("Issue Created");
              this.showPosts();
              this.postInput = '';
              this.authorInput = '';
  
            },(error:any)=>{
              // alert("Failed To Create Issue");
              this.showPosts()
            })
        }

  }

    postAPI(postbody:any){
      // console.log("make post");
      let httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'token '+this.token,
          'Accept': 'application/vnd.github.v3+json',
        })
      }
    
      
       let API_URL = "https://api.github.com/repos/lasertruf/buzzinga/issues"
      let body = {
        title : 'New Post',
        body :postbody,
        // assignees:["lasertruf"]
        // owner: 'lasertruf',
        // repo: 'fridayGoals',
      }
            
       return this.httpClient.post(API_URL,body,httpHeaders)
            .pipe(map((res:any ) => {              
                return res;
        }));
    }

    //=====================POST=========================
    createIssue(){

      if(this.postInput.length>0){
    
        this.post_API().subscribe((res)=>{
            console.log(res);
            alert("Friday Goal Created");
          },(error:any)=>{
            alert("Failed To Create Friday Goal");
          })
      }
    
    }
    
    
    post_API() {
      // this.copyTitle(1)
      // this.copyBody(1)
    
      let httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'token ' +  this.token,
          'Accept': 'application/vnd.github.v3+json'
        })
      }
    
      
       let API_URL = "https://api.github.com/user/repos/lasertruf/buzzinga/issues"
      let body = {
        title : 'New',
        body : this.postInput,
        // labels : ["friday goal"],
        // assignees:["lasertruf"]
        // owner: 'lasertruf',
        // repo: 'fridayGoals',
      }
     
     
       
        return this.httpClient.post(API_URL,body,httpHeaders)
            .pipe(map((res:any ) => {
                return res;
        }));
    }

    //===========================================

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
          'Authorization':  this.token,
          'Accept': 'application/vnd.github.v3+json'
        })
      }

      let API_URL = "https://api.github.com/repos/lasertruf/buzzinga/issues"


      return this.httpClient.get(API_URL,httpHeaders)
      .pipe(map((res:any ) => {   
        // this.postsArr=res; 
        // console.log(this.postsArr);
        // res.forEach((element:any) => {
        //   element.body = element.body.split('[Auth]')[0];
        // });

        res = res.filter((el:any) => el.state == 'open')
        console.log(res,"filytered");
        
        this.postsArr=res; 

                  
          return res;
  }));
    }

  ngOnInit(): void {
    this.showPosts();
      
  }
  compressFile() {
  
    this.imageCompress.uploadFile().then(({image, orientation}) => {
    
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      
      this.imageCompress.compressFile(image, orientation, 80, 80).then(
        async (result) => {
          this.imgResultAfterCompress = result;
          console.log(result);
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
         

        }
      );
      
    });
    
  }

  onDelete(post:any){
    console.log(post);
    
    this.deleteAPI(post).subscribe(()=>{
      setTimeout(() => {
      this.showPosts();
        
      }, 3000);
    })
  }

  deleteAPI(post:any){

    let httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token '+  this.token,
        'Accept': 'application/vnd.github.v3+json'
      })
    }

    let API_URL = "https://api.github.com/repos/lasertruf/buzzinga/issues/"
    let body = {
      state : 'closed'
    }
    return this.httpClient.patch(post.url,body,httpHeaders)
    .pipe(map((res:any ) => {   
      // this.postsArr=res; 
      // console.log(this.postsArr);
      // res.forEach((element:any) => {
      //   element.body = element.body.split('[Auth]')[0];
      // });
      // this.postsArr=res as string[]; 

                
        return res;
}));
  }
}

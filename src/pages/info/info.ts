import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
    commentList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    this.commentList=this.navParams.data;
  }

  addComment(){
      let prompt = this.alertCtrl.create({
          title: 'Add Comment',
          message: "Add your comment below",
          inputs: [
              {
                  name: 'Comment',
                  placeholder: 'Add Comment Here'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
                  handler: data => {
                      console.log('Cancel clicked');
                  }
              },
              {
                  text: 'Save',
                  handler: data => {

                  }
              }
          ]
      });
      prompt.present();
}

  editComment(){
      let prompt = this.alertCtrl.create({
          title: 'Edit Your Comment',
          message: "Change the Comment below",
          inputs: [
              {
                  name: 'commentDesc',
                  placeholder:"comment goes here "
              },
          ],
          buttons: [
              {
                  text: 'Cancel',
                  handler: data => {
                      console.log('Cancel clicked');
                  }
              },
              {
                  text: 'Save',
                  handler: data => {

                  }
              }
          ]
      });
      prompt.present();
  }

  deleteComment(){

  }
}

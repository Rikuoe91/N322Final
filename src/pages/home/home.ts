import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";


@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    cards: any;

    constructor(public navCtrl: NavController, private dataService: DataProvider, public alertCtrl: AlertController) {
        this.cards = this.dataService.cardList;

    }


    likesClicked(card): void {
        card.likes++;
        this.dataService.updateLikes(card.id, card.likes);
    }


    addCard() {
        let prompt = this.alertCtrl.create({
            title: 'Add Card',
            message: "Add Following Information to add card",
            inputs: [
                {
                    name: 'cardName',
                    placeholder: 'card Name'
                }, {
                    name: 'cardDesc',
                    placeholder: 'enter Card Description'
                }, {
                    name: 'avatarIMG',
                    placeholder: 'Avatar image url'
                }, {
                    name: 'userName',
                    placeholder: 'user Name'
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
                        data["likes"] = 0;
                        var today = new Date();
                        data["date"] = (today.getMonth() + 1 + '-' + (today.getDate()) + '-' + today.getFullYear());
                        this.dataService.addNewCard(data);
                    }
                }
            ]
        });
        prompt.present();
    }

    deleteCard(id) {
        this.dataService.deleteCardFromDB(id);
    }

    updateCard(card) {
        let prompt = this.alertCtrl.create({
            title: 'Edit Card Description',
            message: "add a new card desciption below",
            inputs: [
                {
                    name: 'cardDesc',
                    placeholder: card.cardDesc
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
                        this.dataService.updateCardDesc(card.id, data.cardDesc)
                    }
                }
            ]
        });
        prompt.present();
    }

    goToInfo(){
        this.navCtrl.push("InfoPage");
    }

}

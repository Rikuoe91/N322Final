import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";


export interface Card {
    id?: string;
    avatarIMG: string;
    cardDesc: string;
    cardName: string;
    likes: number;
    userName: string;
    date: string;
    timeAgo:string
}

@Injectable()
export class DataProvider {

    cardListRef: AngularFirestoreCollection<Card>;
    cardList: Observable<Card[]>;

    constructor(private afs: AngularFirestore) {
        this.cardListRef = this.afs.collection<Card>('Cards');
        // this.cardList=this.cardListRef.valueChanges();
        this.cardList = this.cardListRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as Card;
                const id = action.payload.doc.id;
                return {id, ...data};
            });
        })
    }


    updateLikes(cardId,likes) {
        this.cardListRef.doc(cardId).update({"likes":likes});
    }


    addNewCard(cardInfo): void {
        if (cardInfo) {
            this.cardListRef.add(cardInfo);
        }
    }

    deleteCardFromDB(cardID): void {
        this.cardListRef.doc(cardID).delete();
    }


    updateCardDesc(cardId,newDesc){
        this.cardListRef.doc(cardId).update({"cardDesc": newDesc});
    }

    // timeSince() {
    //     var now = new Date(), secondsPast = (now.getTime() - this.cards.date.getTime()) / 1000;
    //     if (secondsPast < 60) {
    //         return parseInt(secondsPast) + 's';
    //     }
    //     if (secondsPast < 3600) {
    //         return parseInt(secondsPast / 60) + 'm';
    //     }
    //     if (secondsPast <= 86400) {
    //         return parseInt(secondsPast / 3600) + 'h';
    //     }
    //     if (secondsPast > 86400) {
    //         var day = this.cards.date.getDate();
    //         var month = this.cards.date.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    //         var year = this.cards.date.getFullYear() == now.getFullYear() ? "" : " " + this.cards.date.getFullYear();
    //
    //         this.cards.timeAgo= day+""+month+year;
    //     }
    // }
}

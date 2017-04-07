import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { ItemsPage } from '../items/items';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { ItemProvider } from '../../providers/item-provider';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;

  constructor(public navCtrl: NavController, public itemService: ItemProvider, public modalCtrl: ModalController) {
    
  }

  ionViewDidLoad() {
    this.itemService.getItems().then((data) => {
      console.log(data);
      this.items = data;
    });
  }

  addItem() {
    let modal = this.modalCtrl.create(ItemsPage);

    modal.onDidDismiss(item=> {
      if(item){
        this.items.push(item);
        this.itemService.createItem(item);
      }
    });

    modal.present();
  }

  deleteItem(item) {

    //remove locally

    let index = this.items.indexOf(item);

    if(index > -1) {
      this.items.splice(index, 1);
    }

    //remove from database
    this.itemService.deleteItem(item._id);
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }


  goLogin() {
    this.navCtrl.push(LoginPage);
  }

}

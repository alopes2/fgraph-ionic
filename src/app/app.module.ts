import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { MetaPage } from '../pages/meta/meta';

const config = {
  apiKey: "AIzaSyCXw4CPgW_uR1SQHr72fYkLS329CExNCUk",
  authDomain: "fgraph-ea3b3.firebaseapp.com",
  databaseURL: "https://fgraph-ea3b3.firebaseio.com",
  projectId: "fgraph-ea3b3",
  storageBucket: "fgraph-ea3b3.appspot.com",
  messagingSenderId: "793802145549"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MetaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MetaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

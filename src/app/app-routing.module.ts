import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoosePlayerComponent } from './components/choose-player/choose-player.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  { path: '', component: ChoosePlayerComponent },
  { path: 'game', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

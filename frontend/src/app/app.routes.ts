import { Routes } from '@angular/router';
import { ItemListComponent } from './app/components/item/item-list/item-list.component';
import { ItemDetailComponent } from './app/components/item/item-detail/item-detail.component';
import { ItemFormComponent } from './app/components/item/item-form/item-form.component';

export const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'new', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent },
  { path: '**', redirectTo: '' }
];

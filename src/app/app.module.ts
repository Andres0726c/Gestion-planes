import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DispositivoComponent } from './dispositivo/dispositivo.component';
import { OperadorComponent } from './operador/operador.component';
import { OperadorService } from './operador/operador.service';
import { RouterModule, Routes } from '@angular/router';
import { SimcardComponent } from './simcard/simcard.component';
import { PlanComponent } from './plan/plan.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlanService } from './plan/plan.service';
import { DispositivoService } from './dispositivo/dispositivo.service';
import { SimcardService } from './simcard/simcard.service';
import { DetalleComponent } from './simcard/detalle.component';
import { DisposimcardComponent } from './dispositivosimcard/disposimcard/disposimcard.component';

const routes: Routes = [
  {path: '', redirectTo: '/operadores', pathMatch: 'full'},
  {path: 'dashboard', component: OperadorComponent},
  {path: 'operadores', component: OperadorComponent},
  {path: 'operadores/:id', component: OperadorComponent},
  {path: 'simcards', component: SimcardComponent},
  {path: 'simcards/:id', component: SimcardComponent},
  {path: 'planes', component: PlanComponent},
  {path: 'planes/:id', component: PlanComponent},
  {path: 'dispositivos', component: DispositivoComponent},
  {path: 'dispositivos/:id', component: DispositivoComponent},
  {path: 'dispositivored', component: DispositivoComponent},
  {path: 'dispositivosimcard', component: DispositivoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DispositivoComponent,
    OperadorComponent,
    SimcardComponent,
    PlanComponent,
    DetalleComponent,
    DisposimcardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [OperadorService,
    PlanService,
    DispositivoService, SimcardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

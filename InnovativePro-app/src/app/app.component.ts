import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
 

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'InnovativePro-app';
  prompt = '';
  response = '';
  
  constructor(private http : HttpClient) {

  }
  ngOnInit() : void {
    this.sendPrompt();
  }

  public sendPrompt() {

    this.http.post<any>('http://localhost:3000', { prompt: this.prompt })
    .subscribe(resp => {
      console.log(resp);
      const output = resp.output.join('');
      this.response = output;
    },
    error => {
      console.error('There was an error!', error);
    });
  }
}

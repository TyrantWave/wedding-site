import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import { Rsvp } from './rsvp-model';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {

  rsvp: Rsvp;
  rsvpForm: FormGroup;
  sending = false;

  constructor(private af: AngularFireDatabase, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.rsvpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      coming: [true, Validators.required],
      guests: [1, Validators.required],
      vegetarian: [false],
      nonalcohol: [false]
    })
  }

  onSubmit() {
    this.sending = true;
    this.rsvp = this.prepRsvp();

    const name = `${this.rsvp.name} ${this.rsvp.surname}`;
    const date = Date();
    let html = `
      <div>From: ${name}</div>
      <div>${this.rsvp.coming ? 'Will Attend' : 'Will Not Attend'}</div>
      <div>Date: ${date}</div>
    `;
    if (this.rsvp.coming) {
      html += `
        <div>Guests Coming: ${this.rsvp.guests}</div>
        <div>Dietary Information:</div>
        ${this.rsvp.vegetarian ? '<div>Vegetarian</div>' : ''}
        ${this.rsvp.nonalcohol ? '<div>Non Alcoholic</div>' : ''}
      `
    }
    const formRequest = { name, date, html };
    this.af.list('/messages').push(formRequest);
    setTimeout(() => {
      this.sending = false;
      alert(`Thanks, ${this.rsvp.name}!`);
      this.router.navigateByUrl('/');
    }, 3000);
  }

  prepRsvp(): Rsvp {
    const rsvpModel = this.rsvpForm.value;

    const rsvp: Rsvp = {
      name: rsvpModel.name as string,
      surname: rsvpModel.surname as string,
      coming: rsvpModel.coming as boolean,
      guests: rsvpModel.guests as number,
      vegetarian: rsvpModel.vegetarian as boolean,
      nonalcohol: rsvpModel.nonalcohol as boolean
    }

    return rsvp;
  }
}

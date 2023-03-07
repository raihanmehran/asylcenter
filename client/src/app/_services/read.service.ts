import { Injectable } from '@angular/core';

declare var SpeechSynthesis: any;
declare var SpeechSynthesisUtterance: any;

@Injectable({
  providedIn: 'root',
})
export class ReadService {
  constructor() {}

  read(text: string) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }
}

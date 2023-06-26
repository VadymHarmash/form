import { Injectable } from '@angular/core';
import { IPattern } from 'src/app/interfaces/pattern';
import { IStrength } from 'src/app/interfaces/strength';

@Injectable({
  providedIn: 'root'
})

export class StrengthCheckService {

  public passwordDiff: IStrength = {
    firstLevel: false,
    secondLevel: false,
    thirdLevel: false,
    fourthLevel: false,
    fifthLevel: false
  }

  public patterns: IPattern[] = [
    { pattern: /^[A-Za-z]+$/, name: 'letters' },
    { pattern: /^[0-9]+$/, name: 'digits' },
    { pattern: /^[ `'",~!@#\$%\^\&*\)\(+=._-]+$/, name: 'symbols' },
    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/u, name: 'lettersAndDigits' },
    { pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-_=+{}\[\]|\:;"'<>,.?\/`~])[^0-9]*$/, name: 'lettersAndSymbols' },
    { pattern: /^(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]|\:;"'<>,.?\/`~])[^a-zA-Z]*$/, name: 'digitsAndSymbols' },
    { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-_=+{}\[\]|\:;"'<>,.?\/`~]).*$/, name: 'lettersAndDigitsAndSymbols' }
  ]

  checkStrength(value: string): void {
    if (value === '') {
      this.passwordDiff.firstLevel = true;
      this.passwordDiff.secondLevel = this.passwordDiff.thirdLevel =
        this.passwordDiff.fourthLevel = this.passwordDiff.fifthLevel = false
      return
    }

    for (const { pattern, name } of this.patterns) {
      if (pattern.test(value)) {
        if (value.length < 8) {
          this.passwordDiff.secondLevel = true
          this.passwordDiff.firstLevel = this.passwordDiff.thirdLevel =
            this.passwordDiff.fourthLevel = this.passwordDiff.fifthLevel = false
        } else {
          if (name === 'letters' || name === 'digits' || name === 'symbols') {
            this.passwordDiff.thirdLevel = true
            this.passwordDiff.firstLevel = this.passwordDiff.secondLevel =
              this.passwordDiff.fourthLevel = this.passwordDiff.fifthLevel = false
          } else if (name === 'lettersAndDigits' || name === 'lettersAndSymbols' || name === 'digitsAndSymbols') {
            this.passwordDiff.fourthLevel = true
            this.passwordDiff.firstLevel = this.passwordDiff.secondLevel =
              this.passwordDiff.thirdLevel = this.passwordDiff.fifthLevel = false
          } else if (name === 'lettersAndDigitsAndSymbols') {
            this.passwordDiff.fifthLevel = true
            this.passwordDiff.firstLevel = this.passwordDiff.secondLevel =
              this.passwordDiff.thirdLevel = this.passwordDiff.fourthLevel = false
          } else {
            this.passwordDiff.fifthLevel = this.passwordDiff.firstLevel =
              this.passwordDiff.secondLevel = this.passwordDiff.thirdLevel =
              this.passwordDiff.fourthLevel = false
          }
        }
      }
    }
  }

  showMessage(message: string): string {
    if (this.passwordDiff.firstLevel) return message = 'Enter the password'
    if (this.passwordDiff.secondLevel) return message = 'The password must have 8 symbols'
    if (this.passwordDiff.thirdLevel) return message = 'The password is easy'
    if (this.passwordDiff.fourthLevel) return message = 'The password is medium'
    if (this.passwordDiff.fifthLevel) return message = 'The password is strong'
    return message
  }

  changeIndicators(colors: string[]): string[] {
    if (this.passwordDiff.firstLevel) {
      colors[0] = colors[1] = colors[2] = '#999999'
      return colors
    }
    if (this.passwordDiff.secondLevel) {
      colors[0] = colors[1] = colors[2] = '#ff0000'
      return colors
    }
    if (this.passwordDiff.thirdLevel) {
      colors[0] = '#ff0000'
      colors[1] = colors[2] = '#999999'
      return colors
    }
    if (this.passwordDiff.fourthLevel) {
      colors[0] = colors[1] = '#ffff00'
      colors[2] = '#999999'
      return colors
    }
    if (this.passwordDiff.fifthLevel) {
      colors[0] = colors[1] = colors[2] = '#00ff00'
      return colors 
    }
    return colors
  }
}
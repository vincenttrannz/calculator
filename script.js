/**
 * Source: mostly using guideline from Web Dev Simplidied / Youtube Channel
 * Skin: V1.0 - Iphone Dark mode / self creating
 * Status: Still fixing few other function:
 * 
 */


class Calculator {
    constructor(currentInputLabelTextElement, previousInputLabelTextElement) {
        this.currentInputLabelTextElement = currentInputLabelTextElement
        this.previousInputLabelTextElement = previousInputLabelTextElement
        this.clear()
    }

    clear() {
        this.currentLabel = '0';
        this.previousLabel = '';
        this.method = undefined
    }

    appendNumber(number) {
        if (number === '.' && this.currentLabel.includes('.')) return
        this.currentLabel = this.currentLabel.toString() + number.toString();
    }

    chooseMethod(method) {
        if (this.currentLabel === '') return
        if (this.previousLabel !== '') {
            this.compute()
        }
        this.method = method;
        this.previousLabel = this.currentLabel;
        this.currentLabel = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousLabel)
        const current = parseFloat(this.currentLabel)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.method) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case 'x':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            case '±':
                computation = -Number(current);
                break
            case '%':
                computation = current / 100;
                break
            default:
                return
        }
        this.currentLabel = computation
        this.method = undefined
        this.previousLabel = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1] 
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentInputLabelTextElement.innerText =
            this.getDisplayNumber(this.currentLabel)
        if(this.method == "±"){
            this.currentInputLabelTextElement.innerText = 
            `-` + `${this.getDisplayNumber(this.currentLabel)}`;
            this.previousInputLabelTextElement.innerText = 
            `Please press a number to get minus value`
        } else if(this.method == '%'){
            this.currentInputLabelTextElement.innerText = 
            `${this.getDisplayNumber(this.currentLabel)}%`;
            this.previousInputLabelTextElement.innerText = 
            `Please press a number for its % value`
        } else if (this.method != null) {
            this.previousInputLabelTextElement.innerText = 
                `${this.getDisplayNumber(this.previousLabel)} ${(this.method)}`
        } else {
            this.previousInputLabelTextElement.innerText = ' '
        }
    }

    halfClear(){
        debugger;
        if(this.previousInputLabelTextElement.innerText != ''){
            this.previousLabel = this.currentInputLabelTextElement.innerText;
        }
        this.previousInputLabelTextElement.innerText = 'Calculator is now cleared'
        this.clear()
        // } 
        // if(this.previousLabel = this.currentInputLabelTextElement.innerText){
        // this.currentLabel = this.previousLabel + this.method;
        // }
        // if(this.currentLabel != undefined){
        //     this.currentLabel = this.currentInputLabelTextElement.innerText + this.method;
        // }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const methodButtons = document.querySelectorAll('[data-method]')
const equalsButtons = document.querySelector('[data-equals]')
const allclearButtons = document.querySelector('[data-allclear]')
const currentInputLabelTextElement = document.querySelector('[data-current-input]')
const previousInputLabelTextElement = document.querySelector('[data-previous-input]')


const calculator = new Calculator(currentInputLabelTextElement, previousInputLabelTextElement);



numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

methodButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseMethod(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    calculator.halfClear()
})

allclearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
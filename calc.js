const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calc-screen');
const keys = calculator.querySelector('.calculator-keys');

const calculate = (n1, operator, n2) => {
    let result = ' ';
    
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
}

keys.addEventListener('click', e => {
    
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        if(!action){
            if(displayedNum === '0' || previousKeyType === 'operator'){
                display.textContent = keyContent;
                console.log('number key');
            } else {
                display.textContent = displayedNum + keyContent;
                console.log('number key');
            }      
            calculator.dataset.previousKeyType = 'number';
        }

        if(action === 'decimal'){
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.';
            } else if(previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0';
            }
            console.log('decimal');
            calculator.dataset.previousKeyType = 'decimal';            
        }

        if( action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide'){

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'){
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else{
                calculator.dataset.firstValue = displayedNum;
            }

            // calculator.dataset.previousKeyType = 'operator';
            // calculator.dataset.firstValue = displayedNum;
            // calculator.dataset.operator = action;

            key.classList.add('is-depressed');           
            calculator.dataset.previousKeyType = 'operator';  
            calculator.dataset.operator = action;
            console.log(action);
        }

        if(action === 'all-clear'){
            console.log('clear key');
            calculator.dataset.previousKeyType = 'all-clear';
        }

        if(action === 'calculate'){
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;

            if(firstValue){
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modvalue;
                }

                display.textContent = calculate(firstValue, operator, secondValue);
            }

            // console.log(display.textContent);
            calculator.dataset.previousKeyType = 'calculate';
            calculator.dataset.modvalue = secondValue;
        }      
        }
    });
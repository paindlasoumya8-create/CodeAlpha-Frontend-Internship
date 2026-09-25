let display = document.getElementById("display");

let firstNumber = null;

let operator = null;

let waitingForSecondNumber = false;


/* =========================
   NUMBER BUTTON
========================= */

function numberClicked(number) {

    // If calculator is waiting for second number
    if (waitingForSecondNumber) {

        display.value = number;

        waitingForSecondNumber = false;

    }

    else {

        // If display is 0, replace it

        if (display.value === "0") {

            display.value = number;

        }

        else {

            display.value += number;

        }

    }
}


/* =========================
   DECIMAL BUTTON
========================= */

function decimalClicked() {

    if (waitingForSecondNumber) {

        display.value = "0.";

        waitingForSecondNumber = false;

        return;
    }


    // Don't allow two decimal points

    if (!display.value.includes(".")) {

        display.value += ".";

    }
}


/* =========================
   OPERATOR BUTTON
========================= */

function chooseOperator(selectedOperator) {

    const currentNumber =
        parseFloat(display.value);


    // If user hasn't entered a number

    if (isNaN(currentNumber)) {

        return;

    }


    // If there is already an operation

    if (
        firstNumber !== null &&
        operator !== null &&
        !waitingForSecondNumber
    ) {

        calculate();

    }


    firstNumber =
        parseFloat(display.value);

    operator =
        selectedOperator;

    waitingForSecondNumber = true;

}


/* =========================
   CALCULATE
========================= */

function calculate() {

    if (
        firstNumber === null ||
        operator === null
    ) {

        return;

    }


    const secondNumber =
        parseFloat(display.value);


    if (isNaN(secondNumber)) {

        return;

    }


    let result;


    /* Addition */

    if (operator === "+") {

        result =
            firstNumber + secondNumber;

    }


    /* Subtraction */

    else if (operator === "-") {

        result =
            firstNumber - secondNumber;

    }


    /* Multiplication */

    else if (operator === "*") {

        result =
            firstNumber * secondNumber;

    }


    /* Division */

    else if (operator === "/") {

        if (secondNumber === 0) {

            display.value =
                "Cannot divide by 0";

            firstNumber = null;

            operator = null;

            return;

        }


        result =
            firstNumber / secondNumber;

    }


    /* Show result */

    display.value =
        Number(result.toFixed(10));


    firstNumber = null;

    operator = null;

    waitingForSecondNumber = true;

}


/* =========================
   CLEAR
========================= */

function clearDisplay() {

    display.value = "0";

    firstNumber = null;

    operator = null;

    waitingForSecondNumber = false;

}


/* =========================
   DELETE
========================= */

function deleteNumber() {

    if (
        display.value.length === 1 ||
        display.value === "Cannot divide by 0"
    ) {

        display.value = "0";

    }

    else {

        display.value =
            display.value.slice(0, -1);

    }

}


/* =========================
   PERCENTAGE
========================= */

function percentage() {

    const number =
        parseFloat(display.value);


    if (isNaN(number)) {

        return;

    }


    display.value =
        number / 100;

}


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        /* Numbers */

        if (
            key >= "0" &&
            key <= "9"
        ) {

            numberClicked(key);

        }


        /* Decimal */

        else if (key === ".") {

            decimalClicked();

        }


        /* Operators */

        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            chooseOperator(key);

        }


        /* Enter */

        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        /* Backspace */

        else if (key === "Backspace") {

            deleteNumber();

        }


        /* Escape */

        else if (key === "Escape") {

            clearDisplay();

        }


        /* Percentage */

        else if (key === "%") {

            percentage();

        }

    }
);
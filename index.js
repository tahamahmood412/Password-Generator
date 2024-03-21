// Fetch all values from UI
const inputSlider=document.querySelector("[data-lengthSlider]")
// console.log(inputSlider)
const lengthDisplay=document.querySelector("[data-lengthNumber]")
// console.log(lengthDisplay)

// Get all other values from UI
const passwordDisplay=document.querySelector("[data-passwordDisplay]")
// console.log(passwordDisplay)

const copybtn=document.querySelector("[data-copy-btn]")
// console.log(copybtn)
const copymsg=document.querySelector("[data-copymsg]")
// console.log(copymsg)

const uppercasecheck=document.querySelector("#uppercase")
const lowercasecheck=document.querySelector("#lowercase")
const numberscheck=document.querySelector("#numbers")
const symbolscheck=document.querySelector("#symbols")
// console.log(symbolscheck)

const indicator=document.querySelector("[data-indicator]")
// console.log(indicator)
const generateBtn=document.querySelector(".generatebtn")
// console.log(generateBtn)

const allCheckBox=document.querySelectorAll("input[type=checkbox]")
// console.log(allCheckBox)

let password="";
let passwordlength=10;
let checkCount=0;  // For Generate Password button 

// Startting the fnctions

function handleSlider(){
    inputSlider.value=passwordlength
    lengthDisplay.innerHTML=passwordlength

    console.log("Function called successfully")
}
// handleSlider()



// Random Integer Function
function getrndInteger(min,max){
    return Math.floor(Math.random() * (max-min))+min
}

// Get a random Number
function generaterndnumber(){
    return getrndInteger(0,9)
}

let ans=generaterndnumber()
console.log(ans)


// Get a random small alphabet  by its acsii code
function generatelower(){
    return String.fromCharCode(getrndInteger(97,122))
}

let lower_ans=generatelower()
console.log(lower_ans)


// Get a random capital_letter alphabet  by its acsii code
function generateCapital(){
    return String.fromCharCode(getrndInteger(65,91))
}

let capital_letter=generateCapital()
console.log(capital_letter)

// Get a random symbol
let symbols='!@#$%^&*()_+'

function getsymbol(){
    const rndindex = getrndInteger(0,symbols.length)
    return symbols.charAt(rndindex)
}



// Calculate Password Strength
function Strength(){
    // Calculte Password Strength
let hasupper=false
let haslower=false
let hasnum=false
let hassymbols=false


if (uppercasecheck.checked) hasupper=true
if (lowercasecheck.checked) haslower=true
if (numberscheck.checked) hasnum=true
if (symbolscheck.checked) hassymbols=true

if(hasupper && haslower && (hasnum || hassymbols) && passwordlength>=8){
    console.log("good")
}
else if ((hasupper || haslower) && (hasnum || hasupper) && passwordlength>=6){
    console.log("Middle")
}
else{
    console.log("Weak Password")
}


}


// copymsg.classList.add("active")

async function copyContent(){
    await navigator.clipboard.writeText(passwordDisplay.value)
    copymsg.innerText="copied"

    // copy wala text visible karna ka lia

    setTimeout(() => {
        console.log("Time Started")
        copymsg.classList.remove("active")
    },2000);
}


// Adding event Listner to Slider
inputSlider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleSlider()
})

// Adding event Listner to copybtn
copybtn.addEventListener("click",()=>{
    if (passwordDisplay.value){
        copyContent()
    }
})


// Adding event listner to Generate Password Button
generateBtn.addEventListener('click',()=>{
    // if all checkbox is not selected then do nothing
    if(checkCount<0){
        return;
    }

    // Special Condition
    if (passwordlength<checkCount){
        passwordlength=checkCount
        handleSlider()
    }

    // Stated to find the new password
    password=''

    // //Put the stuff of password by checked boxes
    // if (uppercasecheck.checked){
    //     password+= generateCapital()
    // }
    // if (lowercasecheck.checked){
    //     password+= generatelower()
    // }
    // if(numberscheck.checked){
    //     password+= generaterndnumber()
    // }
    // if(symbolscheck.checked){
    //     password+= getsymbol()
    // }

    // Optimize code
    let  funarr=[]

    if (uppercasecheck.checked){
        funarr.push(generateCapital)
    }
    if (lowercasecheck.checked){
        funarr.push(generatelower)
    }
    if (numberscheck.checked){
        funarr.push(generaterndnumber)
    }
    if(symbolscheck.checked){
        funarr.push(getsymbol)
    }

    // Compulsory Addition
    for(let i=0;i<funarr.length;i++){
        password+= funarr[i]()
    }

        //Remaing Addition
        for(let i=0;i<passwordlength-funarr.length;i++){
            let rndIndex=getrndInteger(0,funarr.length)
            password+= funarr[rndIndex]()
        }

    // Shuffling the Password
    password= shufflePassword(Array.from(password));

    // Show password in UI
    passwordDisplay.value=password
    console.log(password)
    // indicator()



})


// Shuffle Password
function shufflePassword(array) {
    // Fisher Yates Method of shuffling of array
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => {
        str += el;
    });
    return str;
}


// Adding event listner to all checkboxes
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxChange)
})

function handleCheckboxChange(){
    checkCount=0
    allCheckBox.forEach((checkbox)=>{
        if (checkbox.checked){
            checkCount ++ ;
        }
    })

    // Special Condition
    if(passwordlength<checkCount){
        passwordlength=checkCount
        handleSlider()
    }
}


//get current date
let date = new Date();
//get the year
let year = date.getFullYear();;
//get the month
let month = date.getMonth();

//find the dom using queryselector
const day = document.querySelector(".calendar-dates");

console.log(day);

const currDate = document.querySelector(".calendar-current-date");

//get matches for span
const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");

 // Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//function to generate the calendar
const manipulate = () => {
    //get the first day of the month
    let dayOne = new Date(year, month, 1).getDay();
    
    //get the last day of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    //get the day of the last date of the month 
    let dayEnd = new Date(year, month, lastdate).getDay();

    //get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    //store the generated calendar HTML
    let lit = "";

    //loop through the dates of the previous month
    for(let i = dayOne; i > 0; i--) {
        lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    //loop to add the dates of current month
    for(let i = 1; i <= lastdate; i++) {
        //check if the date is today
        let isToday = i === date.getDate() 
        && month === new Date().getMonth()
        && year === new Date().getFullYear()
        ? "active"
        : "";
        lit += `<li class="${isToday}">${i}</li>`
    }

    //get the first few days of the next month
    for (let i = dayEnd; i < 6; i++) {
        lit += `<li class="inactive">${i - dayEnd + 1}</li>`;
    }

    //update the text of the current date element
    currDate.innerHTML = `${months[month]} ${year}`;

     // update the HTML of the dates element 
    // with the generated calendar
    day.innerHTML = lit;

}

manipulate();

//add event listerner to the previous and next icons
prenexIcons.forEach(icon => {

    //add event listener when icon is clicked
    icon.addEventListener("click", () => {
        //check if the icon is the previous icon
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        //check month is not out of range
        if (month <0 || month > 11) {        
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        } else {
            date = new Date();
        }
        manipulate();
    });
});
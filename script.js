//The number of correct question answered by the user
let numberOfCorrectAnswer = 0;


// Show Which row in the table is pressed and highlight it when it's clicked
function showViewPage(inputElement)
{
    mainPage = document.getElementById("mainView");
    anotherPage = document.getElementById("anotherView");
    tutorialPage = document.getElementById("tutorialView");

    
    if(inputElement.value == "anotherPage")
    {
        mainPage.style.display = "none";
        tutorialPage.style.display = "none";
        anotherPage.style.display = "block";
    }
    else if(inputElement.value == "tutorialPage")
    {
        anotherPage.style.display = "none";
        mainPage.style.display = "none";
        tutorialPage.style.display = "block";
    }
    else
    {
        anotherPage.style.display = "none";
        tutorialPage.style.display = "none";
        mainPage.style.display = "block";
    }
        
}

// Call the Meme API to get an array of items
function getApiCall()
{
    $.ajax({
        type: "GET",
        url: "https://api.imgflip.com/get_memes",
        dataType: "json",
        success: function (result, status, xhr) {

            buildTable(result.data.memes);
        },
        error: function (xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}

// Build the table of memes pages
function buildTable(tableList)
{ 
    subject = document.getElementById("tbody");
    tableList.forEach(element => {
    
        subject.insertAdjacentHTML(`beforeend`,`<tr name='row' onclick='selectedRow(this)'>
        <td>${element["name"]}</td>
        <td><a href="${element["url"]}" target="_blank">${element["url"]}<a></td>
        </tr>`);
    });
}

// Change the class of the selected row to active row
function selectedRow(row)
{
    allRow = document.getElementsByName("row");
    allRow.forEach(element => {
        element.className = "";
    });
    row.className = "active-row";
}

// Function pressed when a user press the start button on the quizz
function startQuizz(restart)
{
    if(restart == true)
    {
        let result = document.getElementById("result");
        result.remove();
        numberOfCorrectAnswer = 0;
    }

    let quizStartSection = document.getElementById("quizStartSection");
    quizStartSection.style.display = "none";
    quizStartSection.insertAdjacentHTML("afterend", `<div id="question1Section">
        <p>1 + 2 is equal to ? = </p>
        <input id="answerQuestion1" type="number"></input>
        <button class="button-80" role="button" onclick="VerifyAnswer(1);">Submit</button>
        </div>`);
}

function VerifyAnswer(questionNumber)
{
    //Generation of the first question
    if(questionNumber == 1)
    {
        let answer = document.getElementById("answerQuestion1").value;
        if(answer == 3)
            numberOfCorrectAnswer ++;

        let question = document.getElementById("question1Section");
        question.insertAdjacentHTML("afterend",`<div id="question2Section">
            <p>What is the best name in the world?</p>
            <input id="answerQuestion2"</input>
            <button class="button-80" role="button" onclick="VerifyAnswer(2);">Submit</button>
            </div>`);
        question.remove();
    }
    //Generation of the second question
    else if(questionNumber == 2)
    {
        let answer = document.getElementById("answerQuestion2").value;
        if(answer.toLowerCase() == "samuel")
            numberOfCorrectAnswer ++;

        let question = document.getElementById("question2Section");
        question.insertAdjacentHTML("afterend",`<div id="question3Section">
            <p>What was the first question?</p>
            <input type="radio" id="1" name="answerQuestion3" value="1">
            <label for="1">1 + 2 = ?</label><br>
            <input type="radio" id="2" name="answerQuestion3" value="2">
            <label for="2">2 + 3 = ?</label><br>
            <input type="radio" id="3" name="answerQuestion3" value="3">
            <label for="3">the best name is ?</label>
            <br>
            <button class="button-80" role="button" onclick="VerifyAnswer(3);">Submit</button>
            </div>`);
        question.remove();
    }
    //Generation of the third question
    else if(questionNumber == 3)
    {
        let answer = document.getElementsByName("answerQuestion3");
        answer.forEach(element => {
            if(element.id == 1 && element.checked == true)
                numberOfCorrectAnswer ++;
        });

        let question = document.getElementById("question3Section");
        question.insertAdjacentHTML("afterend",`<div id="question4Section">
            <p>Which of those is the best language?</p>
            <select name="programmingLanguage" id="programmingLanguage">
                <option value="c++">C++</option>
                <option value="javascript">Javascript</option>
                <option value="french">French</option>
                <option value="html">Html</option>
            </select>
            <br>
            <button class="button-80" role="button" onclick="showResult();">Submit</button>
            </div>`);
        question.remove();
    }

}

//Generate the result page of the questionnaire and also check if the 4th question is right
function showResult()
{
    //Verify the 4th question
    let answer = document.getElementById("programmingLanguage");
    if(answer.value == "french")
        numberOfCorrectAnswer ++;

    let question = document.getElementById("question4Section");
    if(numberOfCorrectAnswer >= 2)
    {
        question.insertAdjacentHTML("afterend", `<div id="result">
            <p class="goodAnswer"> Good job you have ${numberOfCorrectAnswer} correct answer! </p>
            <button class="button-80" role="button" onclick="startQuizz(true);">Try Again</button>
            </div>`);
    }
    else
    {
        question.insertAdjacentHTML("afterend", `<div id="result">
            <p class="badAnswer"> Unfortunately you have ${numberOfCorrectAnswer} correct answer! Please try again :(</p>
            <button class="button-80" role="button" onclick="startQuizz(true);">Try Again</button>
            </div>`);
    }
    question.remove();

}

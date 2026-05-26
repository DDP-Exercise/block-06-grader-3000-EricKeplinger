"use strict";

export const gradesview = {
    view: document.getElementById("view"),

    render(){
        this.view.innerHTML = "";

        const title = document.createElement("h1");
        title.textContent = "Grader 3000";
        this.view.appendChild(title);

        const paragraph = document.createElement("p");
        paragraph.textContent = "Das hier ist das neue Programm zur Bestimmung der Schulnoten.\n" +
            "Die Gesamtnote ergibt sich aus deinen Übungen und deiner Klausur.\n" +
            "Die Klausur macht 40% deiner Note aus und deine Übungen 60%,\n" +
            "wobei das schlechteste Übungsergebnis aus der Wertung gestrichen wird.\n" +
            "Es müssen aber beide Gebiete positiv, also mit >50%, abgeschlossen werden,\n" +
            "um das Semester positiv abschließen zu können. Außerdem benötigst duch auch\n" +
            "eine Anwesenheitsrate von mindestens 80%, ansonsten bestehst du das Semster nicht!";
        this.view.appendChild(paragraph);

        const tasksContainer = document.createElement("div");
        tasksContainer.id = "tasks";
        const testContainer = document.createElement("div");
        testContainer.id = "test";
        const attendanceContainer = document.createElement("div");
        attendanceContainer.id = "attendance";
        const worstGradeContainer = document.createElement("div");
        worstGradeContainer.id = "worstGrade";
        const resultContainer = document.createElement("div");
        resultContainer.id = "result";

        for(let i = 0; i < 8; i++){
            const taskField = this.getPointsField(`Übung ${i + 1}`, 0, "task", i);
            tasksContainer.appendChild(taskField);
        }

        const testField = this.getPointsField("Klausur", 0, "testgrade");
        testContainer.appendChild(testField);

        const attendanceField = this.getAttendanceField("Anwesenheitsrate", 0, "attendance");
        attendanceContainer.appendChild(attendanceField);

        worstGradeContainer.textContent = "Streichergebnis: Übung ";

        resultContainer.textContent = "Gesamtnote: 0";

        this.view.appendChild(tasksContainer);
        this.view.appendChild(testContainer);
        this.view.appendChild(attendanceContainer);
        this.view.appendChild(worstGradeContainer);
        this.view.appendChild(resultContainer);
    },

    getPointsField(labelText, value, name, index){
        const padding = document.createElement("div");

        const label = document.createElement("label");
        const input = document.createElement("input");
        label.textContent = labelText;
        input.type = "number";
        input.min = "0";
        input.max = "100";
        input.value = value;
        input.name = name;

        if (index !== undefined){
            input.dataset.index = index;
        }

        padding.appendChild(label);
        padding.appendChild(input);
        return padding;
    },

    getAttendanceField(labelText, value, name){
        const padding = document.createElement("div");

        const label = document.createElement("label");
        const input = document.createElement("input");
        label.textContent = labelText;
        input.type = "number";
        input.min = "0";
        input.max = "100";
        input.value = value;
        input.name = name;

        padding.appendChild(label);
        padding.appendChild(input);
        return padding;
    },

    showResult(finalGrade){
        const result = document.getElementById("result");
        if (finalGrade >= 0 && finalGrade <= 50){
            result.textContent = `Gesamtnote: ${finalGrade.toFixed(2)} % Nicht Genügend`;
        } else if (finalGrade > 50 && finalGrade <= 61){
            result.textContent = `Gesamtnote: ${finalGrade.toFixed(2)} % Genügend`;
        } else if (finalGrade > 61 && finalGrade <= 74){
            result.textContent = `Gesamtnote: ${finalGrade.toFixed(2)} % Befriedigend`;
        } else if (finalGrade > 74 && finalGrade <= 86){
            result.textContent = `Gesamtnote: ${finalGrade.toFixed(2)} % Gut`;
        } else if (finalGrade > 86 && finalGrade <= 100){
            result.textContent = `Gesamtnote: ${finalGrade.toFixed(2)} % Sehr Gut`;
        }
    },

    showWorstGrade(worstGrade, worstTask){
        const remove = document.getElementById("worstGrade");
        remove.textContent = `Streichergebnis: Übung ${worstGrade + 1} mit ${worstTask} Punkte`;
    },

    highlightWorstGrade(worstField){
        const taskField = document.querySelectorAll('input[name="task"]');

        for(let i = 0; i < taskField.length; i++){
            taskField[i].classList.remove("worst-grade");
        }

        const worstInput = document.querySelector(`input[name="task"][data-index="${worstField}"]`);

        if(worstInput){
            worstInput.classList.add("worst-grade");
        }
    }


}
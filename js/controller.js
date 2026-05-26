"use strict";

import {gradesmodel} from "./model.js";
import {gradesview} from "./view.js";

export const gradescontroller = {
    init(){
        gradesview.render();
        this.registerEvents();
    },

    registerEvents(){
        gradesview.view.addEventListener('change', (event) => {
            const input = event.target;
            const points = Number(input.value);

            if(input.name === "task"){
                const index = Number(input.dataset.index)
                gradesmodel.setTaskGrade(index, points);
            }

            if(input.name === "testgrade"){
                gradesmodel.setTestGrade(points);
            }

            if(input.name === "attendance"){
                gradesmodel.setAttendance(points);
            }

            const worstGrade = gradesmodel.getWorstGrade();
            const worstTask = gradesmodel.getWorstTask();
            const worstField = gradesmodel.getWorstGrade();
            gradesview.showWorstGrade(worstGrade, worstTask);
            gradesview.highlightWorstGrade(worstField);

            const finalGrade = gradesmodel.getfinalGrade();
            gradesview.showResult(finalGrade);

        });
    },

}

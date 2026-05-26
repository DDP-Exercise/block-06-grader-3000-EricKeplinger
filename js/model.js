"use strict";

import {gradescontroller} from "./controller.js";

gradescontroller.init();

export const gradesmodel = {
    taskgrades: [0,0,0,0,0,0,0,0],
    testgrade: 0,
    attendance: 0,

    setTaskGrade(index, points){
        this.taskgrades[index] = points;
    },

    setTestGrade(points){
        this.testgrade = points;
    },

    setAttendance(points){
        this.attendance = points;
    },

    isGradePositive(points){
        if(points > 50){
            return true;
        } else {
            return false;
        }
    },

    getWorstGrade(){
      let worstGrade = 0;

      for(let i = 1; i < this.taskgrades.length; i++){
          if(this.taskgrades[worstGrade] > this.taskgrades[i]){
              worstGrade = i;
          }
      }

      return worstGrade;
    },

    getWorstTask(){
        let worstGrade = 0;

        for(let i = 1; i < this.taskgrades.length; i++){
            if(this.taskgrades[worstGrade] > this.taskgrades[i]){
                worstGrade = i;
            }
        }

        return this.taskgrades[worstGrade];
    },

    getfinalTaskGrade(){
        const worstGrade = this.getWorstGrade();
        let counter = 0;
        const maxpoints = (this.taskgrades.length - 1) * 100;
        let points = 0;
        let taskgrade = 0;

        for(let i = 0; i < this.taskgrades.length; i++){
            if(this.isGradePositive(this.taskgrades[i])){
                counter++;
            }
            if(i !== worstGrade){
                points += this.taskgrades[i];
            }
        }

        if(counter >= 6){
            taskgrade = ((points / maxpoints) * 100);
        }

        return taskgrade;
    },

    getfinalGrade(){
        const taskgrade = this.getfinalTaskGrade();
        const finalGrade = (taskgrade * 0.6) + (this.testgrade * 0.4);
        const failed = 0;

        if(this.attendance >= 80 && this.isGradePositive(this.testgrade) && this.isGradePositive(taskgrade)){
            return finalGrade;
        } else {
            return failed;
        }

    },

    getResultReason(){
        const taskgrade = this.getfinalTaskGrade();
        const attendanceFail = "Du hast die erforderlichen 80% Anwesenheit nicht erreicht";
        const taskFail = "Es sind leider mehr als 2 Übungen negativ";
        const testFail = "Leider war deine Klausur negativ";
        const pass = "";

        if(this.attendance < 80){
            return attendanceFail;
        } else if(this.isGradePositive(this.testgrade) === false){
            return testFail;
        } else if(this.isGradePositive(taskgrade) === false){
            return taskFail;
        } else{
            return pass;
        }
    }

}
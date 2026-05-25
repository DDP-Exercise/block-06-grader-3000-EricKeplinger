"use strict";

import {gradesmodel} from "./model.js";
import {gradesview} from "./view.js";

export const gradescontroller = {
    init(){
        gradesview.render();
    }
}

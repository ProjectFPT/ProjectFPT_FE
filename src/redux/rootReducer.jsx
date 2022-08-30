import { combineReducers } from "redux";
import { InfoTable } from "./InfoTable";
import { ScoreReducer } from "./ScoreReducer";
import  NameTable  from "./NameTable";
import { GetNameReducer } from "./GetNameReducer";
import { GetDataCompare } from "./GetDataCompare";
import { StatusHeader } from "./StatusHeader";

export const rootReducer = combineReducers({
    InfoTable,ScoreReducer,NameTable,GetNameReducer,GetDataCompare,StatusHeader
});
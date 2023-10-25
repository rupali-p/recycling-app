import recyclableSymbol from "./images/arl_symbols/recyclable.jpg";
import notRecyclableSymbol from "./images/arl_symbols/not_recyclable.jpg";
import conditionalSymbol from "./images/arl_symbols/conditional.jpg";
import checkLocalSymbol from "./images/arl_symbols/check_locally.jpg";

export const CLASS_ARTICLE_MAPPING = {
    "PET": 1,
    "HDPE": 2,
    "UPVC/PVC": 3,
    "LDPE": 4,
    "PP": 5,
    "PS": 6,
    "EPS": 7,
    "R": 8,
    "CR": 9,
    "NR": 10,
    "CL": 11
}

const recyclable = {"abbr": "R", "symbolImage": recyclableSymbol}
const notRecyclable = {"abbr": "NR", "symbolImage": notRecyclableSymbol}
const conditional = {"abbr": "CR", "symbolImage": conditionalSymbol}
const checkLocal = {"abbr": "CL", "symbolImage": checkLocalSymbol}
export const ARL_CLASS_LABELS_MAPPING = {
    "Recyclable": recyclable,
    "Conditionally Recyclable": conditional,
    "Not Recyclable": notRecyclable,
    "Check Locally": checkLocal
}

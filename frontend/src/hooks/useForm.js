import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let isFormValid = true;
      for (const inputID in state.inputs) {
        if (inputID === action.inputID) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[inputID].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isFormValid: isFormValid,
      };
    }
    // case "CLEAR": {
    //   // console.log(Object.entries(state.inputs));
    //   const inputsCopy = { ...state.inputs };
    //   for (const inputID of Object.entries(inputsCopy)) {
    //     inputID[1].value = "";
    //     inputID[1].isValid = false;
    //   }

    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       ...inputsCopy,
    //     },
    //     isFormValid: false,
    //   };
    // }
    default: {
      return state;
    }
  }
};

export const useForm = (initInputs, initFormIsValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInputs,
    isFormValid: initFormIsValid,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      isValid,
      inputID: id,
    });
  }, []);

  // const onClear = () => {
  //   dispatch({ type: "CLEAR" });
  // };

  return [formState, onInputHandler];
};
